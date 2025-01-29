import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button className="faq-question" onClick={onClick}>
                <RichText.Content tagName="h3" value={question} />
                <span className="toggle-icon">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
                <div className="faq-answer">
                    <RichText.Content tagName="p" value={answer} />
                </div>
            )}
        </div>
    );
};

const FAQAccordionEdit = (props) => {
    const { attributes, setAttributes } = props;
    const { faqItems } = attributes;
    const blockProps = useBlockProps();

    const addFAQItem = () => {
        const newItem = { question: '', answer: '' };
        setAttributes({ faqItems: [...faqItems, newItem] });
    };

    const updateFAQItem = (index, key, value) => {
        const updatedItems = [...faqItems];
        updatedItems[index][key] = value;
        setAttributes({ faqItems: updatedItems });
    };

    const removeFAQItem = (index) => {
        const updatedItems = faqItems.filter((_, i) => i !== index);
        setAttributes({ faqItems: updatedItems });
    };

    return (
        <div {...blockProps}>
            <h2>{__('FAQ Accordion', 'faq-accordion-block')}</h2>
            {faqItems.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <RichText
                        tagName="h3"
                        placeholder={__('Enter question...', 'faq-accordion-block')}
                        value={item.question}
                        onChange={(value) => updateFAQItem(index, 'question', value)}
                    />
                    <RichText
                        tagName="p"
                        placeholder={__('Enter answer...', 'faq-accordion-block')}
                        value={item.answer}
                        onChange={(value) => updateFAQItem(index, 'answer', value)}
                    />
                    <button onClick={() => removeFAQItem(index)}>
                        {__('Remove FAQ', 'faq-accordion-block')}
                    </button>
                </div>
            ))}
            <button onClick={addFAQItem} style={{ marginTop: '10px' }}>
                {__('Add FAQ', 'faq-accordion-block')}
            </button>
        </div>
    );
};

const FAQAccordionSave = (props) => {
    const { attributes } = props;
    const { faqItems } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <h2>{__('FAQ Accordion', 'faq-accordion-block')}</h2>
            {faqItems.map((item, index) => (
                <FAQItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={false}
                    onClick={() => {}}
                />
            ))}
        </div>
    );
};

registerBlockType('faq-accordion-block/faq-accordion', {
    title: __('FAQ Accordion', 'faq-accordion-block'),
    icon: 'editor-ul',
    category: 'widgets',
    attributes: {
        faqItems: {
            type: 'array',
            default: [],
        },
    },
    edit: FAQAccordionEdit,
    save: FAQAccordionSave,
});
