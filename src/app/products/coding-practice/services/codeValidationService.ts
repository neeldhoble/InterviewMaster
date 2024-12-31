interface ValidationResult {
  isValid: boolean;
  errors: {
    line: number;
    message: string;
    severity: 'error' | 'warning';
  }[];
}

interface SyntaxError {
  line: number;
  message: string;
  severity: 'error' | 'warning';
}

class CodeValidationService {
  validatePython(code: string): ValidationResult {
    const errors: SyntaxError[] = [];
    const lines = code.split('\n');

    // Basic Python syntax validation
    lines.forEach((line, index) => {
      // Check for missing colons after control statements
      if (line.trim().match(/^(if|for|while|def|class).*[^:]\s*$/)) {
        errors.push({
          line: index + 1,
          message: 'Missing colon (:) after control statement',
          severity: 'error'
        });
      }

      // Check for incorrect indentation
      if (line.match(/^( [^ ]|\t [^\t])/)) {
        errors.push({
          line: index + 1,
          message: 'Inconsistent indentation',
          severity: 'error'
        });
      }

      // Check for unclosed parentheses/brackets
      const openCount = (line.match(/[\(\[\{]/g) || []).length;
      const closeCount = (line.match(/[\)\]\}]/g) || []).length;
      if (openCount !== closeCount) {
        errors.push({
          line: index + 1,
          message: 'Unclosed parentheses or brackets',
          severity: 'error'
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateJavaScript(code: string): ValidationResult {
    const errors: SyntaxError[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      // Check for missing semicolons
      if (line.trim() && !line.trim().endsWith(';') && 
          !line.trim().endsWith('{') && 
          !line.trim().endsWith('}') &&
          !line.trim().match(/^(if|for|while|function|class|import|export).*/)) {
        errors.push({
          line: index + 1,
          message: 'Missing semicolon',
          severity: 'warning'
        });
      }

      // Check for unclosed brackets
      const openCount = (line.match(/[\(\[\{]/g) || []).length;
      const closeCount = (line.match(/[\)\]\}]/g) || []).length;
      if (openCount !== closeCount) {
        errors.push({
          line: index + 1,
          message: 'Unclosed brackets',
          severity: 'error'
        });
      }

      // Check for undefined variables (basic)
      if (line.includes('var ')) {
        errors.push({
          line: index + 1,
          message: 'Consider using let or const instead of var',
          severity: 'warning'
        });
      }
    });

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors
    };
  }

  validateCode(code: string, language: string): ValidationResult {
    switch (language.toLowerCase()) {
      case 'python':
        return this.validatePython(code);
      case 'javascript':
        return this.validateJavaScript(code);
      default:
        return { isValid: true, errors: [] };
    }
  }
}

export const codeValidationService = new CodeValidationService();
