# PowerShell script to fix all remaining HTML files
$pages = @(
    "load-balancing.html",
    "dns.html", 
    "tcp-udp.html",
    "http.html",
    "cdn.html",
    "microservices.html",
    "caching.html",
    "database-scaling.html",
    "event-driven.html",
    "message-queues.html",
    "api-design.html",
    "rate-limiting.html",
    "multi-tier.html",
    "sessions.html",
    "serialization.html"
)

foreach ($page in $pages) {
    $filePath = "pages\$page"
    if (Test-Path $filePath) {
        Write-Host "Fixing $page"
        
        # Read the file
        $content = Get-Content $filePath -Raw
        
        # Add base href after line 6
        $content = $content -replace "(<title>.*?</title>)", "`$1`n    <base href=""/student-learning-portal/">"
        
        # Fix relative paths
        $content = $content -replace 'href="../assets/', 'href="assets/'
        $content = $content -replace 'src="../assets/', 'src="assets/'
        $content = $content -replace 'href="../index.html"', 'href="index.html'
        
        # Write back
        $content | Out-File -FilePath $filePath -Encoding utf8 -Force
    }
}

Write-Host "All pages fixed!"
