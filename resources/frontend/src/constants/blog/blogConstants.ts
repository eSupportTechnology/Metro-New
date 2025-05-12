export const sortOptions = [
    { label: 'Latest First', field: 'date', direction: 'desc' as const },
    { label: 'Oldest First', field: 'date', direction: 'asc' as const },
    { label: 'Title: A to Z', field: 'title', direction: 'asc' as const },
    { label: 'Title: Z to A', field: 'title', direction: 'desc' as const },
    { label: 'Category: A to Z', field: 'category', direction: 'asc' as const },
    { label: 'Category: Z to A', field: 'category', direction: 'desc' as const },
];

export const filterCategories = [
    {
        name: 'category',
        label: 'Category',
        options: [
            {
                value: 'News',
                label: 'News',
                filter: (blog: any) => blog.category === 'News',
            },
            {
                value: 'Events',
                label: 'Events',
                filter: (blog: any) => blog.category === 'Events',
            },
            {
                value: 'Tips',
                label: 'Tips',
                filter: (blog: any) => blog.category === 'Tips',
            },
        ],
    },
];

export const BLOGS_PER_PAGE = 10;

export const blogCategories = ['News', 'Events', 'Tips'];

export const defaultFormData = {
    title: '',
    category: 'News',
    image: null,
    writer: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
};
