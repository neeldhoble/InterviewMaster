export interface LanguageConfig {
  id: string;
  name: string;
  extensions: string[];
  snippets: Record<string, { prefix: string; body: string[]; description: string }>;
  defaultCode: string;
  templates: Record<string, string>;
}

export const languageConfigs: Record<string, LanguageConfig> = {
  python: {
    id: 'python',
    name: 'Python',
    extensions: ['.py'],
    defaultCode: 'def solution():\n    pass\n\n# Write your code here\n',
    snippets: {
      'for': {
        prefix: 'for',
        body: ['for ${1:item} in ${2:items}:', '    ${3:pass}'],
        description: 'For Loop'
      },
      'while': {
        prefix: 'while',
        body: ['while ${1:condition}:', '    ${2:pass}'],
        description: 'While Loop'
      },
      'if': {
        prefix: 'if',
        body: ['if ${1:condition}:', '    ${2:pass}'],
        description: 'If Statement'
      },
      'def': {
        prefix: 'def',
        body: ['def ${1:function_name}(${2:parameters}):', '    ${3:pass}'],
        description: 'Function Definition'
      },
      'class': {
        prefix: 'class',
        body: ['class ${1:ClassName}:', '    def __init__(self):', '        ${2:pass}'],
        description: 'Class Definition'
      }
    },
    templates: {
      'array': 'def process_array(arr):\n    # Your code here\n    return result\n',
      'string': 'def process_string(s):\n    # Your code here\n    return result\n',
      'linkedlist': 'class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef process_list(head):\n    # Your code here\n    return result\n'
    }
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    extensions: ['.js'],
    defaultCode: 'function solution() {\n  \n}\n\n// Write your code here\n',
    snippets: {
      'for': {
        prefix: 'for',
        body: ['for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {', '    ${3}', '}'],
        description: 'For Loop'
      },
      'foreach': {
        prefix: 'foreach',
        body: ['${1:array}.forEach((${2:item}) => {', '    ${3}', '});'],
        description: 'ForEach Loop'
      },
      'if': {
        prefix: 'if',
        body: ['if (${1:condition}) {', '    ${2}', '}'],
        description: 'If Statement'
      },
      'function': {
        prefix: 'fn',
        body: ['function ${1:name}(${2:params}) {', '    ${3}', '}'],
        description: 'Function Declaration'
      },
      'arrow': {
        prefix: 'arrow',
        body: ['const ${1:name} = (${2:params}) => {', '    ${3}', '};'],
        description: 'Arrow Function'
      }
    },
    templates: {
      'array': 'function processArray(arr) {\n    // Your code here\n    return result;\n}\n',
      'string': 'function processString(str) {\n    // Your code here\n    return result;\n}\n',
      'linkedlist': 'class ListNode {\n    constructor(val = 0, next = null) {\n        this.val = val;\n        this.next = next;\n    }\n}\n\nfunction processList(head) {\n    // Your code here\n    return result;\n}\n'
    }
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    extensions: ['.cpp'],
    defaultCode: '#include <iostream>\n\nclass Solution {\npublic:\n    void solve() {\n        \n    }\n};\n',
    snippets: {
      'for': {
        prefix: 'for',
        body: ['for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {', '    ${3}', '}'],
        description: 'For Loop'
      },
      'while': {
        prefix: 'while',
        body: ['while (${1:condition}) {', '    ${2}', '}'],
        description: 'While Loop'
      },
      'if': {
        prefix: 'if',
        body: ['if (${1:condition}) {', '    ${2}', '}'],
        description: 'If Statement'
      },
      'class': {
        prefix: 'class',
        body: ['class ${1:ClassName} {', 'public:', '    ${2}', '};'],
        description: 'Class Definition'
      }
    },
    templates: {
      'array': '#include <vector>\n\nclass Solution {\npublic:\n    vector<int> processArray(vector<int>& nums) {\n        // Your code here\n        return result;\n    }\n};\n',
      'string': '#include <string>\n\nclass Solution {\npublic:\n    string processString(string s) {\n        // Your code here\n        return result;\n    }\n};\n',
      'linkedlist': 'struct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x = 0, ListNode *next = nullptr) : val(x), next(next) {}\n};\n\nclass Solution {\npublic:\n    ListNode* processList(ListNode* head) {\n        // Your code here\n        return result;\n    }\n};\n'
    }
  },
  java: {
    id: 'java',
    name: 'Java',
    extensions: ['.java'],
    defaultCode: 'class Solution {\n    public void solve() {\n        \n    }\n}\n',
    snippets: {
      'for': {
        prefix: 'for',
        body: ['for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {', '    ${3}', '}'],
        description: 'For Loop'
      },
      'foreach': {
        prefix: 'foreach',
        body: ['for (${1:Type} ${2:item} : ${3:items}) {', '    ${4}', '}'],
        description: 'For Each Loop'
      },
      'if': {
        prefix: 'if',
        body: ['if (${1:condition}) {', '    ${2}', '}'],
        description: 'If Statement'
      },
      'class': {
        prefix: 'class',
        body: ['public class ${1:ClassName} {', '    ${2}', '}'],
        description: 'Class Definition'
      }
    },
    templates: {
      'array': 'class Solution {\n    public int[] processArray(int[] nums) {\n        // Your code here\n        return result;\n    }\n}\n',
      'string': 'class Solution {\n    public String processString(String s) {\n        // Your code here\n        return result;\n    }\n}\n',
      'linkedlist': 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) {\n        val = x;\n        next = null;\n    }\n}\n\nclass Solution {\n    public ListNode processList(ListNode head) {\n        // Your code here\n        return result;\n    }\n}\n'
    }
  }
};

export function getLanguageConfig(language: string): LanguageConfig {
  return languageConfigs[language] || languageConfigs.python;
}

export function getTemplateForProblemType(language: string, type: string): string {
  const config = getLanguageConfig(language);
  return config.templates[type] || config.defaultCode;
}

export function getSnippets(language: string): Record<string, { prefix: string; body: string[]; description: string }> {
  const config = getLanguageConfig(language);
  return config.snippets;
}
