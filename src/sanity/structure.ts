import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Instagram Settings')
        .id('instagramSettings')
        .child(
          S.document()
            .schemaType('instagramSettings')
            .documentId('instagramSettings')
            .title('Instagram Settings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'instagramSettings'
      ),
    ])
