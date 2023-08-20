import React, { useEffect, useState } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [Media, setmedia] = useState([]);
  const [Image, setimage] = useState([]);

  useEffect(() => {
    fetch('http://localhost/wordpress/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.log(error));
  }, []);
  const featuredMediaUrls = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const featuredMediaUrl = `${post.featured_media}`;
    featuredMediaUrls.push(featuredMediaUrl);
  }
  useEffect(() => {
    fetch(`http://localhost/wordpress/wp-json/wp/v2/media/${featuredMediaUrls}`)
      .then(response => response.json())
      .then(data => {
        const sourceUrls = data.map(mediaObject => mediaObject?.source_url);
        setimage(sourceUrls);
      })
      .catch(error => console.log(error));
  }, [featuredMediaUrls]);
console.log(posts)
  
  return (
    <div className="bg-white dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Team</h2>
        <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Explore the whole collection of open-source web components and elements built with the utility classes from Tailwind</p>
      </div>
      <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
      {posts.map((post, index) => {
          // Extracting the featured image URL
          const featuredImageURL = post["wp:featuredmedia"]?.[0]?.href || "";
  
          return (
            <div key={post.id} className="items-center bg-gray-50 dark:bg-gray-800 rounded-lg shadow sm:flex dark:border-gray-700">
              <a href="#">
              <img
              className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
              src={Image[index]}
              alt="Bonnie Avatar"
              style={{ objectFit: 'cover',  height: "14rem" }}
            />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">{post.title.rendered}</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">CEO &amp; Web Developer</span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  {post.content.rendered.split(" ").slice(0, 15).join(" ")}
                </p>
                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.383 0 0 5.383 0 12c0 6.617 5.383 12 12 12s12-5.383 12-12c0-6.617-5.383-12-12-12zm4.972 18.18c-.545.195-1.108.314-1.694.357a6.993 6.993 0 0 1-4.278-1.48c-.136-.098-.221-.253-.221-.423v-1.48c0-.391.314-.707.707-.707s.707.316.707.707v1.023c.132.024.265.043.401.057a5.993 5.993 0 0 0 3.884-1.5c.293-.233.557-.502.78-.803.302-.397.502-.884.561-1.41a5.467 5.467 0 0 0-.211-2.474c.372-.139.717-.335 1.025-.58a.724.724 0 0 0 .084-1.048 7.946 7.946 0 0 0-2.614-1.692.718.718 0 0 0-.929.541.718.718 0 0 0 .541.929c.655.154 1.272.442 1.826.842.306.201.579.436.809.699.451-.816 1.08-1.45 1.849-1.852a3.97 3.97 0 0 0-1.296-1.894.716.716 0 0 0-.947.18.716.716 0 0 0 .18.947c.348.295.64.66.865 1.084.299-.08.61-.122.933-.122 1.024 0 1.966.512 2.523 1.365a6.97 6.97 0 0 1-.107 6.38 7.04 7.04 0 0 1-3.51 3.045zM17 12h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.384 0 0 5.384 0 12c0 6.617 5.384 12 12 12s12-5.383 12-12c0-6.616-5.384-12-12-12zm3.255 12.006l-5.253 2.502v-4.867l5.253-2.501v4.866zm-.673-1.835l-2.5-1.186-2.5 1.186v2.371l2.5 1.186 2.5-1.186v-2.371zm-6.194-.098l2.499 1.185 2.5-1.186v-2.371l-2.5-1.185-2.5 1.186v2.371zm.673 1.835v4.866l-5.254-2.501v-4.867l5.254 2.502zm1.388-9.186l1.184 2.5-1.184 2.5h-2.371l-1.185-2.5 1.185-2.5h2.371zm1.835 6.194l1.186-2.5h4.867l-2.502 5.253-1.186-2.501-1.186 2.501-2.502-5.253h4.867z"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <footer className="px-4 py-6 mx-auto max-w-screen-xl bg-white dark:bg-gray-900">
        <div className="max-w-screen-sm mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          © 2023 Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
  
  
  
        }
export default App;
