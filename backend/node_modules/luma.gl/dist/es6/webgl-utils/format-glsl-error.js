import getShaderName, { getShaderTypeName } from './get-shader-name';
export function parseGLSLCompilerError(errLog, src, shaderType, shaderName) {
  const errorStrings = errLog.split(/\r?\n/);
  const errors = {};
  const warnings = {};
  const name = shaderName || getShaderName(src) || '(unnamed)';
  const shaderDescription = `${getShaderTypeName(shaderType)} shader ${name}`;

  for (let i = 0; i < errorStrings.length; i++) {
    const errorString = errorStrings[i];

    if (errorString.length <= 1) {
      continue;
    }

    const segments = errorString.split(':');
    const type = segments[0];
    const line = parseInt(segments[2], 10);

    if (isNaN(line)) {
      throw new Error(`GLSL compilation error in ${shaderDescription}: ${errLog}`);
    }

    if (type !== 'WARNING') {
      errors[line] = errorString;
    } else {
      warnings[line] = errorString;
    }
  }

  const lines = addLineNumbers(src);
  return {
    shaderName: shaderDescription,
    errors: formatErrors(errors, lines),
    warnings: formatErrors(warnings, lines)
  };
}
export default function formatGLSLCompilerError(errLog, src, shaderType) {
  const _parseGLSLCompilerErr = parseGLSLCompilerError(errLog, src, shaderType),
        shaderName = _parseGLSLCompilerErr.shaderName,
        errors = _parseGLSLCompilerErr.errors,
        warnings = _parseGLSLCompilerErr.warnings;

  return `GLSL compilation error in ${shaderName}\n\n${errors}\n${warnings}`;
}

function formatErrors(errors, lines) {
  let message = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!errors[i + 3] && !errors[i + 2] && !errors[i + 1]) {
      continue;
    }

    message += `${line}\n`;

    if (errors[i + 1]) {
      const error = errors[i + 1];
      const segments = error.split(':', 3);
      const type = segments[0];
      const column = parseInt(segments[1], 10) || 0;
      const err = error.substring(segments.join(':').length + 1).trim();
      message += padLeft(`^^^ ${type}: ${err}\n\n`, column);
    }
  }

  return message;
}

function addLineNumbers(string, start = 1, delim = ': ') {
  const lines = string.split(/\r?\n/);
  const maxDigits = String(lines.length + start - 1).length;
  return lines.map((line, i) => {
    const lineNumber = i + start;
    const digits = String(lineNumber).length;
    const prefix = padLeft(lineNumber, maxDigits - digits);
    return prefix + delim + line;
  });
}

function padLeft(string, digits) {
  let result = '';

  for (let i = 0; i < digits; ++i) {
    result += ' ';
  }

  return `${result}${string}`;
}
//# sourceMappingURL=format-glsl-error.js.map