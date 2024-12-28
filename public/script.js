function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function removeComments() {
    const code = document.getElementById('codeInput').value;
    const startMarker = document.getElementById('startMarker').value;
    const endMarker = document.getElementById('endMarker').value;

    let pattern;
    if (endMarker === "\\n") {
      // Single-line comments
      pattern = new RegExp(`${escapeRegex(startMarker)}.*?(?=\\n|$)`, 'g');
    } else {
      // Multi-line comments
      pattern = new RegExp(`${escapeRegex(startMarker)}.*?${escapeRegex(endMarker)}`, 'gs');
    }

    const cleanedCode = code.replace(pattern, '');
    document.getElementById('outputArea').value = cleanedCode;
  }

  function setPreset(language) {
    const startMarkerInput = document.getElementById('startMarker');
    const endMarkerInput = document.getElementById('endMarker');

    if (language === 'JavaScript') {
      startMarkerInput.value = '//';
      endMarkerInput.value = '\\n';
    } else if (language === 'Python') {
      startMarkerInput.value = '#';
      endMarkerInput.value = '\\n';
    } else if (language === 'C') {
      startMarkerInput.value = '/*';
      endMarkerInput.value = '*/';
    } else if (language === 'HTML') {
      startMarkerInput.value = '<!--';
      endMarkerInput.value = '-->';
    }
  }
  document.getElementById('copyToClipboard-a').addEventListener('click', function () {
    const outputArea = document.getElementById('outputArea');
    const textToCopy = outputArea.value;

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert('Copied to clipboard!');
      },
      (err) => {
        alert('Couldnt copy - error');
      }
    );
  });
  document.getElementById('copyToClipboard-b').addEventListener('click', function () {
    const outputArea = document.getElementById('cssCode');
    const textToCopy = outputArea.value;

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert('Copied to clipboard!');
      },
      (err) => {
        alert('Couldnt copy - error');
      }
    );
  });
  document.getElementById('copyToClipboard-c').addEventListener('click', function () {
    const outputArea = document.getElementById('output-code');
    const textToCopy = outputArea.value;

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert('Copied to clipboard!');
      },
      (err) => {
        alert('Couldnt copy - error');
      }
    );
  });
  function generateGradient() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const gradientType = document.getElementById('gradientType').value;
    const direction = document.getElementById('direction').value;

    let gradientCSS;

    if (gradientType === 'linear') {
      gradientCSS = `linear-gradient(${direction}deg, ${color1}, ${color2})`;
    } else if (gradientType === 'radial') {
      gradientCSS = `radial-gradient(circle, ${color1}, ${color2})`;
    }

    const gradientPreview = document.getElementById('gradientPreview');
    gradientPreview.style.background = gradientCSS;

    const cssCode = document.getElementById('cssCode');
    cssCode.value = `background: ${gradientCSS};`;
  }
  function formatHTML(html) {
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    html = html.replace(reg, '$1\n$2$3');
    let pad = 0;
    html.split('\n').forEach(function (line) {
        let indent = 0;
        if (line.match(/<\/\w[^>]*>/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (line.match(/<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        }
        formatted += '  '.repeat(pad) + line + '\n';
        pad += indent;
    });
    return formatted.trim();
}

document.getElementById('format-btn').addEventListener('click', function () {
    const inputCode = document.getElementById('input-code').value;
    const formattedCode = formatHTML(inputCode);
    document.getElementById('output-code').value = formattedCode;
});