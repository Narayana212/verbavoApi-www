'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const client = new QueryClient()

/**
 * Providers component that wraps its children with QueryClientProvider
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The child components to be wrapped
 * @returns {JSX.Element} A QueryClientProvider component wrapping the children
 */
const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default Providers