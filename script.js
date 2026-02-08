// E-Learning Question Formatter Script

document.addEventListener('DOMContentLoaded', function() {
    const questionInput = document.getElementById('questionInput');
    const questionOutput = document.getElementById('questionOutput');
    const formatBtn = document.getElementById('formatBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Format the question
    formatBtn.addEventListener('click', function() {
        const input = questionInput.value.trim();
        
        if (!input) {
            alert('Please enter a question first!');
            return;
        }

        // Basic formatting logic
        let formatted = input;
        
        // Add question number if not present
        if (!formatted.match(/^Q\d+[:.]/)) {
            formatted = 'Q1: ' + formatted;
        }
        
        // Ensure proper capitalization
        formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
        
        // Ensure question mark at the end if it's a question
        if (!formatted.match(/[?.!]$/)) {
            formatted += '?';
        }
        
        // Format multiple choice options if present
        formatted = formatted.replace(/([a-d])\)/gi, '\n$1)');
        formatted = formatted.replace(/([a-d])\./gi, '\n$1.');
        
        questionOutput.value = formatted.trim();
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        if (!questionOutput.value) {
            alert('Nothing to copy! Please format a question first.');
            return;
        }

        questionOutput.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    // Clear both textareas
    clearBtn.addEventListener('click', function() {
        questionInput.value = '';
        questionOutput.value = '';
        questionInput.focus();
    });

    // Auto-resize textareas
    function autoResize(element) {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    }

    questionInput.addEventListener('input', function() {
        autoResize(this);
    });

    questionOutput.addEventListener('input', function() {
        autoResize(this);
    });
});
