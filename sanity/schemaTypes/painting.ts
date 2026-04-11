import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const painting = defineType({
  name: 'painting',
  title: 'Painting',
  type: 'document',
  icon: ImageIcon,
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Describe the painting for screen readers and search engines. E.g. "Large-format abstract oil painting in deep blues and gold leaf."',
      validation: (rule) => rule.required().max(125),
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'geoDescription',
      title: 'Geo Description',
      type: 'text',
      description: 'A description of the painting\'s geographical and contextual details, optimized for AI search engines and semantic understanding.',
      validation: (rule) => rule.max(1000),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      description: 'e.g. 60 × 80 cm',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g. Oil on canvas, Acrylic on linen',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in DKK',
    }),
    defineField({
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      description: 'Mark this painting as sold',
      initialValue: false,
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Images',
      type: 'array',
      description: 'Up to 2 extra images shown in the carousel alongside the main image',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the browser tab / search-result title (60 chars max). Defaults to the painting title.',
      validation: (rule) => rule.max(60),
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description shown in search results (160 chars max). Summarise the work compellingly.',
      validation: (rule) => rule.max(160),
      fieldset: 'seo',
    }),
  ],
})
