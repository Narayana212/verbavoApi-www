'use client'

import { cn } from '@/lib/utils'
import { Highlight, themes } from 'prism-react-renderer'

/**
 * Renders a code block with syntax highlighting
 * @param {Object} props - The component props
 /**
  * Renders a code block with line numbers and syntax highlighting
  * @param {Object} props - The props object containing rendering information
  * @param {string} props.className - CSS class name for styling the pre element
  * @param {Object} props.style - Inline styles for the pre element
  * @param {Array} props.tokens - Array of tokens representing each line of code
  * @param {Function} props.getLineProps - Function to get props for each line
  * @param {Function} props.getTokenProps - Function to get props for each token
  * @returns {JSX.Element} A pre element containing the formatted code block
  */
 * @param {string} props.code - The code to be highlighted
 * @returns {JSX.Element} A pre element containing the highlighted code
 */
const Code = ({ code }: { code: string }) => {
  return (
    <Highlight theme={themes.vsDark} code={code} language='tsx'>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className={cn(className, 'w-fit')}>
          ```
          /**
           * Renders a code block with line numbers and syntax highlighting
           * @param {Array} tokens - An array of tokens representing lines of code
           * @param {Function} getLineProps - A function to get props for each line
           * @param {Function} getTokenProps - A function to get props for each token
           * @returns {Array} An array of React elements representing the formatted code block
           */
          
          ```          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i })
            return (
              <div key={i} style={{ position: 'relative' }} {...rest}>
                <span className='text-zinc-500 select-none pr-8 '>{i + 1}</span>
                /**
                 * Renders a line of code tokens as individual spans
                 * @param {Array} line - An array of tokens representing a line of code
                 * @param {Function} getTokenProps - A function to get props for each token
                 * @returns {Array} An array of React span elements representing the tokens
                 */
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}

export default Code