#!/bin/bash

# Script to fix base href for all HTML files
echo "Fixing base href for all HTML files..."

# Fix homepage
sed -i '7i\    <base href="/student-learning-portal/">' index.html

# Fix all pages
for file in pages/*.html; do
    echo "Fixing $file"
    sed -i '7i\    <base href="/student-learning-portal/">' "$file"
    # Update relative paths to absolute
    sed -i 's|href="../assets/|href="assets/|g' "$file"
    sed -i 's|src="../assets/|src="assets/|g' "$file"
done

echo "All files fixed!"
