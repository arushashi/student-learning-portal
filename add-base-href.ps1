# PowerShell script to add base href back for GitHub Pages
$pages = Get-ChildItem "pages/*.html"

foreach ($page in $pages) {
    Write-Host "Adding base href to $($page.Name)"
    
    # Read the file
    $content = Get-Content $page.FullName -Raw
    
    # Add base href after title tag
    $content = $content -replace "(<title>.*?</title>)", "`$1`n    <base href=""/student-learning-portal/">"
    
    # Write back
    $content | Out-File -FilePath $page.FullName -Encoding utf8 -Force
}

Write-Host "Base href added to all pages!"
