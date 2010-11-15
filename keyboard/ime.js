window.ipaIme = function () {
    // Maps ASCII key -> IPA look-alikes
    var SuggestionsMap = {
        'a': ['æ', 'ɐ', 'ɑ', 'ɒ', 'ʌ'],
        'b': ['ʙ', 'β', 'ɞ', 'ɓ'],
        'c': ['ç', 'ɔ', 'ɕ'],
        'd': ['ɖ', 'ɗ'],
        'e': ['ɘ', 'ə', 'ɛ', 'ɜ', 'æ', 'œ', 'ɶ'],
        'f': ['ɟ', 'ʄ', 'ʄ'],
        'g': ['ɡ', 'ɢ', 'ɠ', 'ʛ', 'ɕ'],
        'h': ['ħ', 'ɦ', 'ɰ', 'ɥ', 'ʜ', 'ɧ'],
        'i': ['ɨ', 'ɪ'],
        'j': ['ʝ'],
        'l': ['ʃ', 'ɬ', 'ɮ', 'ɭ', 'ʟ'],
        'm': ['ɱ', 'ɰ', 'ɯ', 'ʍ'],
        'n': ['ɳ', 'ɲ', 'ŋ', 'ɴ'],
        'o': ['ɸ', 'θ', 'ð', 'ø', 'ɵ', 'œ', 'ɶ', 'ʘ'],
        'r': ['ɽ', 'ʁ', 'ɹ', 'ɻ', 'ɺ'],
        's': ['ʂ'],
        't': ['ʈ'],
        'u': ['ʉ', 'ʊ'],
        'v': ['ɣ', 'ʋ', 'ʎ', 'ʊ', 'ɤ', 'ʌ'],
        'w': ['ʍ', 'ɰ', 'ɯ'],
        'x': ['χ'],
        'y': ['ʎ', 'ʏ'],
        'z': ['ʒ', 'ʐ', 'ɮ', 'ʑ'],
        '?': ['ʔ', 'ʕ', 'ʢ', 'ʡ'],
        '!': ['ǀ', 'ǂ', 'ǁ'],
        '|': ['ǀ', 'ǂ', 'ǁ'],
        '#': ['ǂ', 'ǁ']
    };

    var suggestions;
    var HighlightColor = '#C8FFC4'; // Color to highlight suggestions in the IPA chart
    var textArea;
    var isFeatureEnabled = false; // Weather auto-suggestion feature is enabled    
    var suggestionsEl; // Element holding suggestions
    var nodesHighlighted; // Currently highlighted nodes
    var charToNodeMap = {}; // Map of characters to DOM node represeting that string    

    function onKeyDown(e) {
        e = e || window.event;

        // Some browsers don't fire onKeyPress events for keys like "escape" or "backspace"
        // This line will detect those keys and keys outside ASCII range to clear suggestions
        if (e.keyCode <= 0x20 || e.keyCode >= 0x7F) {
            ipaIme.clearSuggestions();
        }
    }

    function onKeyPress(e) {
        var previousSuggestions = suggestions;

        // Call clear suggestions even if feature is no longer enabled.
        // Calling it will gracefully turn the feature off anyways
        ipaIme.clearSuggestions();

        if (!isFeatureEnabled) {
            return;
        }

        e = e || window.event;
        var pressed = String.fromCharCode(e.charCode).toLowerCase();

        if (previousSuggestions &&
            e.charCode >= 0x31 && e.charCode <= 0x39) {

            var selectedIndex = parseInt(pressed) - 1;

            if (selectedIndex < previousSuggestions.length) {
                previousSuggestions[selectedIndex].onclick();
                if (e.preventDefault)
                    e.preventDefault();
                return false;
            }
        }

        suggestions = null;
        var mappings = SuggestionsMap[pressed];

        nodesHighlighted = [];

        // Highlight the original pressed key on the IPA chart even if no suggestions are found
        node = charToNodeMap[pressed];
        if (node) {
            nodesHighlighted.push(node);
        }

        suggestions = [];
        if (mappings) {
            suggestionsEl.innerHTML = 'Similar-looking:&nbsp;&nbsp;';

            for (var i = 0; i < mappings.length; i++) {
                var suggestedKey = mappings[i];

                node = charToNodeMap[suggestedKey];
                if (node) {
                    nodesHighlighted.push(node);
                }


                if (i < 9) {
                    var numberEl = document.createElement('span');
                    numberEl.innerHTML = i + 1 + '&nbsp;';
                    suggestionsEl.appendChild(numberEl);
                }

                var suggestion = createSuggestion(suggestedKey, pressed, i + 1);
                suggestionsEl.appendChild(suggestion);
                suggestions.push(suggestion);

            }
            suggestionsEl.style.visibility = '';
        }


        // Highlight suggestions
        for (var i = 0; i < nodesHighlighted.length; i++) {
            nodesHighlighted[i].style.backgroundColor = HighlightColor;
        }
    };

    function createSuggestion(p_suggestedKey, p_originalKey, p_id) {
        var suggestionEl = document.createElement('a');
        suggestionEl.innerHTML = '&nbsp;' + p_suggestedKey + '&nbsp;';
        suggestionEl.style.backgroundColor = HighlightColor;
        suggestionEl.style.marginRight = '10px';
        suggestionEl.style.textDecoration = 'none';
        suggestionEl.href = '#';

        suggestionEl.onclick = function () {
            insertSuggestion(p_suggestedKey, p_originalKey);
        }

        return suggestionEl;
    }

    function insertSuggestion(p_suggestedKey, p_originalKey) {
        textArea.focus();
        if (textarea_selection)
            textarea_selection.select();

        //Gecko/Opera
        if (textArea.selectionStart || textArea.selectionStart == '0') {
            var startPos = textArea.selectionStart;
            var endPos = textArea.selectionEnd;

            if (startPos > 0 && textArea.value.substring(startPos, startPos - 1) == p_originalKey) {
                // Delete the original key since the suggested key will replace it
                startPos--;
            }

            textArea.value = textArea.value.substring(0, startPos) + p_suggestedKey + textArea.value.substring(endPos, textArea.value.length);
            textArea.selectionStart = startPos + p_suggestedKey.length;
            textArea.selectionEnd = startPos + p_suggestedKey.length;
        }
        //MSIE
        else if (document.selection)
            textarea_selection.text = p_suggestedKey;
        else
            textArea.value += p_suggestedKey;

        if (textarea_selection)
            textarea_selection.select();
    }


    return {
        registerCharacter: function (p_element) {
            charToNodeMap[p_element.innerHTML] = p_element;
        },
        init: function (p_textArea) {
            textArea = p_textArea;
            suggestionsEl = document.getElementById('suggestions')

            if (document.addEventListener) {
                textArea.addEventListener('keypress', onKeyPress, false);
                textArea.addEventListener('keydown', onKeyDown, false);
            }
            else {
                textArea.onkeypress = onKeyPress;
                textArea.onkeydown = onKeyDown;
            }
        },
        setEnabled: function (p_enabled) {
            isFeatureEnabled = p_enabled;

            if (!p_enabled) {
                suggestionsEl.style.visibility = 'hidden';
            }
        },
        clearSuggestions: function () {
            suggestions = null;

            if (nodesHighlighted) {
                for (var i = nodesHighlighted.length; i--; ) {
                    nodesHighlighted[i].style.backgroundColor = 'transparent';
                }
                nodesHighlighted = null;
                suggestionsEl.style.visibility = 'hidden';
            }

        }
    }
} ();
