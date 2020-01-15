
* fn Tests
  * setMissingExtension
    * Empty extension has no impact on basename with no extension
    * Existing extension
      * Existing extension returned trimmed next to trimmed basename
    * No extension
      * New extension is returned trimmed next to trimmed basename
  * slug
    * Empty slug returns empty slug
    * Only spaces in slug returns empty slug
    * Letters returned lowercase, digits return unchanged
    * Heading spaces removed, letters returned lowercase, digits return unchanged
    * Trailing spaces removed, letter returned lowercase, digits returned unchanged
    * Heading special characters removed
    * Trailing special characters removed
    * Sequences of special charaters or spaces changed into a single dash
    * Sequences of special characters or spaces preceded by at least a dash changed into a single dash
    * Sequences of special characters or spaces followed by at least a dash changed into a single dash