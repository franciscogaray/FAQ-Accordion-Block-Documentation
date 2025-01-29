## **FAQ Accordion Block Documentation**

### **Overview**
The `index.js` file defines a custom Gutenberg block for creating an **FAQ Accordion**. This block allows users to add multiple FAQ items, each consisting of a **question** and an **answer**. The block supports dynamic editing in the Gutenberg editor and renders the FAQs in an accordion format on the frontend.

---

### **Code Structure**
The code is divided into the following components:
1. **Imports**: Required dependencies from WordPress packages.
2. **FAQItem Component**: A reusable component for rendering individual FAQ items.
3. **FAQAccordionEdit Component**: Handles the block's editing interface.
4. **FAQAccordionSave Component**: Handles the block's frontend rendering.
5. **Block Registration**: Registers the block with Gutenberg.

---

### **Imports**
The following dependencies are imported:
- `registerBlockType`: Registers the block with Gutenberg.
- `useBlockProps`, `RichText`, `InnerBlocks`: WordPress block editor utilities.
- `useState`: React hook for managing state.
- `__`: WordPress internationalization function for translating strings.

```javascript
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
```

---

### **FAQItem Component**
The `FAQItem` component renders a single FAQ item with a **question** and an **answer**. It includes:
- A **button** to toggle the visibility of the answer.
- A **toggle icon** (`+` or `-`) to indicate the state of the FAQ item.

#### Props:
- `question`: The FAQ question.
- `answer`: The FAQ answer.
- `isOpen`: Boolean indicating whether the FAQ is open.
- `onClick`: Function to handle the toggle action.

```javascript
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
```

---

### **FAQAccordionEdit Component**
The `FAQAccordionEdit` component handles the block's editing interface. It allows users to:
- Add new FAQ items.
- Edit the **question** and **answer** of each FAQ item.
- Remove FAQ items.

#### Key Features:
- **State Management**: Uses `attributes` to store FAQ items and `setAttributes` to update them.
- **Dynamic Rendering**: Maps over `faqItems` to render editable fields for each FAQ.
- **Add/Remove Functionality**: Buttons to add or remove FAQ items.

```javascript
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
```

---

### **FAQAccordionSave Component**
The `FAQAccordionSave` component handles the block's frontend rendering. It:
- Renders the FAQ items in a static format.
- Uses the `FAQItem` component to display each FAQ.

#### Props:
- `attributes`: Contains the `faqItems` array.

```javascript
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
```

---

### **Block Registration**
The block is registered using `registerBlockType`. It includes:
- **Block Name**: `faq-accordion-block/faq-accordion`.
- **Title**: Displayed in the block inserter.
- **Icon**: A smiley icon.
- **Category**: `widgets`.
- **Attributes**: `faqItems` array to store FAQ data.
- **Edit and Save Components**: `FAQAccordionEdit` and `FAQAccordionSave`.

```javascript
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
```

---

### **Usage**
1. **Add the Block**:
   - In the Gutenberg editor, search for the "FAQ Accordion" block and add it to a post or page.

2. **Add FAQ Items**:
   - Use the "Add FAQ" button to create new FAQ items.
   - Enter the question and answer for each item.

3. **Edit FAQ Items**:
   - Click on the question or answer to edit the text.
   - Use the "Remove FAQ" button to delete an item.

4. **View on Frontend**:
   - The FAQs will be displayed in an accordion format on the frontend.

---

### **Customization**
- **Styling**: Modify the CSS in `style.scss` to change the appearance of the FAQ accordion.
- **Functionality**: Add features like animations, keyboard navigation, or ARIA attributes for accessibility.
