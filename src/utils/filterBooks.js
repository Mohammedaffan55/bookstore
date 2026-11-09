// Pure function so it is easy to unit test.
export function filterBooks(books, { query = '', category = 'All', maxPrice = Infinity, sort = 'relevance' } = {}) {
  const q = query.trim().toLowerCase();
  let result = books.filter((b) => {
    const matchesQuery = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    const matchesCategory = category === 'All' || b.category === category;
    return matchesQuery && matchesCategory && b.price <= maxPrice;
  });

  const sorters = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    title: (a, b) => a.title.localeCompare(b.title),
  };
  if (sorters[sort]) result = [...result].sort(sorters[sort]);
  return result;
}
