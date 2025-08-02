# PowerShell script to add new language translations to LanguageContext.tsx

$content = Get-Content "contexts/LanguageContext.tsx" -Raw

# Find the position to insert new translations (after the closing brace of Marathi translations)
$insertPosition = $content.LastIndexOf("  },")

if ($insertPosition -eq -1) {
    Write-Host "Could not find insertion point"
    exit 1
}

# Read the additional translations
$additionalTranslations = Get-Content "additional-translations.ts" -Raw

# Extract the translations object content (remove the export statement)
$translationsContent = $additionalTranslations -replace "// Additional translations for Indian languages`nexport const additionalTranslations = {", ""
$translationsContent = $translationsContent -replace "};$", ""

# Insert the new translations
$beforeInsert = $content.Substring(0, $insertPosition)
$afterInsert = $content.Substring($insertPosition)

$newContent = $beforeInsert + $translationsContent + $afterInsert

# Write the updated content back to the file
Set-Content "contexts/LanguageContext.tsx" $newContent -Encoding UTF8

Write-Host "Successfully added new language translations to LanguageContext.tsx" 