 // Memuat animasi hanya setelah konten dimuat sepenuhnya
 window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    hero.classList.add('animate-pulse'); // Animasi ketika konten dimuat

    // Menghentikan animasi setelah beberapa detik (contoh: 3 detik)
    setTimeout(() => {
        hero.classList.remove('animate-pulse');
    }, 3000);
});


  // JavaScript to get current year and display it
  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').innerText = currentYear;

  // JavaScript to create blog posts
  const blogPosts = document.getElementById('blogPosts');

  // Mock data for blog posts
  const posts = [
    { title: 'Blog Post 1', content: 'Content for blog post 1' },
    { title: 'Blog Post 2', content: 'Content for blog post 2' },
    { title: 'Blog Post 3', content: 'Content for blog post 3' }
    // Add more posts as needed
  ];

  // Function to create individual blog post elements
  function createBlogPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `
      <h2 class="text-xl font-semibold">${post.title}</h2>
      <p>${post.content}</p>
    `;
    return postElement;
  }

  // Display blog posts
  posts.forEach(post => {
    const postElement = createBlogPost(post);
    blogPosts.appendChild(postElement);
  });