export type Article ={
    id: string;
    title: string;
    excerpt: string;
    content: string;
    readTime: number;
    image: string;
    slug: string;
  }

export const articles: Article[] = [
  {
    id: '1',
    title: 'How to revive bread',
    excerpt: 'Learn the best techniques to bring your bread back to life and keep it fresh longer.',
    content: `For a whole loaf:
        Dampen the crust by brushing it with water or briefly running the loaf under water for a few seconds.
        Bake at 160-180°C for 10-15 minutes.
        Let it cool for a few minutes, then enjoy!`,
    readTime: 3,
    image: 'https://assets.epicurious.com/photos/5aac1f9a0f4ab164841eb03b/16:9/w_2560%2Cc_limit/stale-bread-under-water-13032018.jpg',
    slug: 'how-to-revive-bread'
  },
  {
    id: '2',
    title: 'How to store bread',
    excerpt: 'Proper storage techniques for both short and long-term bread preservation.',
    content: `Short-term storage (If you’ll finish the bread today or tomorrow):
            Place the cut side of the loaf down on a clean surface or wrap it loosely to prevent the crumb from drying out.

Long-term storage:
        Slice the rest of the loaf.
        Store the slices in a freezer-safe bag.
        Freeze for up to 3 months.`,
    readTime: 4,
    image: 'https://bakinggreatbread.blog/wp-content/uploads/2022/08/theperfectloaf-how-to-store-bread-1-1.jpg?w=1024',
    slug: 'how-to-store-bread'
  }
];