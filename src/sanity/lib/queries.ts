import { groq } from 'next-sanity'

export const faqQuery = groq`
  *[_type == "faqItem"] | order(order asc, _createdAt asc) {
    _id,
    question,
    answer
  }
`
