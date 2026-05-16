import { groq } from 'next-sanity'

export const faqQuery = groq`
  *[_type == "faqItem"] | order(order asc, _createdAt asc) {
    _id,
    question,
    answer
  }
`

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    pronouns,
    image,
    description,
    buttonText,
    buttonLink,
    direction
  }
`
