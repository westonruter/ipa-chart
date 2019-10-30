<h1>International Phonetic Alphabet (<abbr title="International Phonetic Alphabet">IPA</abbr>)</h1>
<p>in Unicode and XHTML/CSS</p>

<p><a title="View the chart" href="http://westonruter.github.com/ipa-chart/"><img src="http://westonruter.github.com/ipa-chart/screenshot.png" width="320" alt="Screenshot of the IPA Chart"></a></p>

<p><em>(This is an old project that I moved from my site over to be fully hosted by GitHub, so I haven't updated the writeup below of much of the code in many years.)</em></p>

<p>The symbols defined in the International Phonetic Alphabet are used extensively in Phonetics and Phonology, and it is therefore essential that the symbols be easily  			accessible and displayed. Before <a href="http://www.unicode.org/">Unicode</a>,  			this was difficult: linguists were forced to create custom ASCII fonts (such as <a href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&amp;id=encore-ipa">SIL IPA93</a>),  			use ASCII glyphs themselves (eg. <a href="http://www.phon.ucl.ac.uk/home/sampa/home.htm"><acronym title="Speech Assessment Methods Phonetic Alphabet">SAMPA</acronym></a>), or drop using text  			and use images of IPA symbols instead (see <a title="University of Victoria's Graphical IPA Keypad" href="http://web.uvic.ca/hrd/ipa/main.htm">Graphical IPA Keypad</a>). For a 1999 snapshot of these problems, see <a href="http://www.gsu.edu/%7Elawmmb/phonweb/webIPA.htm">Matthew Brooks</a>. 			With Unicode, which is now widely used and supported by browsers such as <a href="http://www.mozilla.org/">Firefox</a>, Internet Explorer, and <a href="http://www.opera.com/">Opera</a>, 			IPA symbols can be displayed efficiently and semantically.  To showcase the capabilities of Unicode, I replicated the chart created by the <a href="http://www2.arts.gla.ac.uk/IPA/ipa.html">International Phonetic Association</a>, which  			appears in most of the Phonetics and Phonology texts. 			The chart is written in fully compliant XHTML 1.1 and CSS2, and is released under the <a href="http://www.gnu.org/copyleft/gpl.html"><acronym title="General Public License">GPL</acronym></a>.</p>
<p><a href="http://westonruter.github.com/ipa-chart/">View the chart →</a></p>
<p>Additionally, I’ve also built an <a href="http://westonruter.github.com/ipa-chart/keyboard/">IPA “keyboard”</a> off of the chart in order to facilitate copying the Unicode symbols and making transcriptions. It keeps track of recently used symbols and allows you to insert the symbols encoded in HTML entities. <em>It works best in <a href="http://www.getfirefox.com/">Firefox</a></em> and <a href="http://opera.com/">Opera 9+</a>, 			but also works in Internet Explorer 6 (but not in version 5).</p>
<p><a href="http://westonruter.github.com/ipa-chart/keyboard/">View the “keyboard” →</a></p>

Changelog
=========

See [old changelog](http://westonruter.github.com/ipa-chart/changelog-old.html) for previous changes.

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
   - It would be nice if it were possible to insert a small raised schwa offglide for short US English vowels like [ʊ], which tend to be diphthongal, and a small raised [ɑ] for the American English [ɔ], which tends to have such an offglide. (via Karen C.)
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

<hr>
<p>Developed by <a href="https://weston.ruter.net/" rel="author">Weston Ruter</a> (<a href="https://twitter.com/westonruter">@westonruter</a>).</p>
