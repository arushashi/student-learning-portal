# PowerShell script to remove base href and fix paths for all pages
$pages = Get-ChildItem "pages/*.html"

foreach ($page in $pages) {
    Write-Host "Fixing $($page.Name)"
    
    # Read the file
    $content = Get-Content $page.FullName -Raw
    
    # Remove base href
    $content = $content -replace '    <base href="/student-learning-portal/">', ''
    
    # Fix CSS paths
    $content = $content -replace 'href="assets/css/', 'href="../assets/css/'
    
    # Fix JS paths
    $content = $content -replace 'src="assets/js/', 'src="../assets/js/'
    
    # Fix home links
    $content = $content -replace 'href="index.html"', 'href="../index.html"'
    
    # Write back
    $content | Out-File -FilePath $page.FullName -Encoding utf8 -Force
}

Write-Host "All pages fixed!"
