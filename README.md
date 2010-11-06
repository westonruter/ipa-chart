[View online](http://weston.ruter.net/projects/ipa-chart/view/)

Changelog
=========

See [old changelog](http://weston.ruter.net/projects/ipa-chart/#changelog) for previous changes.

Todo List
=========

1. Add a look-alike search functionality. Type "a" into a search box and a æ ɑ ɒ will be highlighted (via Su W.)
2. More information on hover over of character (via Shu W.)
   - Link to Wikipedia entry of character.
   - Link to play audio file (HTML5 Audio)
3. Update to not use frames; just show the character buffer when URL fragment is present.
4. Option to customize the chart, changing the default layout, adding additional characters not found on the official chart, or replacing some with your own, for example:
   - in the line of ieɛa an additional vowel between /i/ and /e/  (via Hermann F.)
   - in the line of uoɔɒ an additional vowel between /o/ and /ɔ/  (via ibid.)
   - in the line of yøœɶ an additional vowel between /ø/ and /œ/  (via ibid.)
   - raised 'm' symbol like the nasalised 'n', used in transcibing the word /amahlombe/ from Zulu, found in South Africa
   - putting the epiglottal consonants together up with the main consonants (via Percy W.)
   - the superscript equal sign to mark an unaspirated stop (eg. '40' = /'fɔr t⁼i/) (via James N.)
   - adding u025D ɝ
   - alternate voiceless diacritic for glyphs with descenders? e.g. U+030A (via Jason T.)
5. Ability to change default font
6. Isolate text-directionality into another file... ltr.css and rtl.css
7. Make other stylesheets for other media and media queries (e.g. mobile devices)
8. Make an SVG vowel quadrilateral that is used by default and then falls back to the HTML table
9. Consolidate stylesheet, taking out repetitious statements (eg. TH {font-weight})
10. Position tables better to make the chart more compact.

Old Issues (may no longer be valid)
===================================

 - Mozilla cannot display the colgroup borders correctly in dir=rtl, see bug 89856
 - Opera does not have bidi support
 - MSIE cannot apply colgroup styles to the table
 - Note: Lucida Sans Unicode cannot display the tie bar and SILDoulosUnicodeIPA (correctly) requires the tiebar be placed in between the characters to be tied. Arial Unicode MS is the most widely supported and tied the previous two characters together. Lucida Sans Unicode cannot render an upper tiebar.
 - Lucida Sans Unicode chops lower diacritics in half.
 - SILDoulosUnicodeIPA does not support the nasal release diacritic.
 - The embed element is not defined by the W3C, but it is the only tag that Internet Explorer and Mozilla recognize.