import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  const result = await fetch('https://viewcounter.iansutherland.ca', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.X_API_KEY!,
    },
    body: JSON.stringify({
      slug: '/lab/remix-fan-club',
    }),
  });
  const data = await result.json();

  return json({
    views: data.views.toString().padStart(6, '0'),
  });
};

export default function Index() {
  const data = useLoaderData();
  const count = data.views;

  return (
    <div className="content">
      <h1>💿 Remix Fan Club 💿</h1>
      <div className="pics">
        <div className="pic">
          <img src="/michaeljackson.jpeg" alt="Michael Jackson" />
          <p>Michael</p>
        </div>
        <div className="pic">
          <img src="/kentcdodds.jpeg" alt="Kent C. Dodds" />
          <p>Kent</p>
        </div>
        <div className="pic">
          <img src="/ryanflorence.jpeg" alt="Ryan Florence" />
          <p>Ryan</p>
        </div>
        <div className="pic">
          <img src="/derrick.gif" alt="Derrick" />
          <p>Derrick</p>
        </div>
      </div>
      <div className="marquee">
        <marquee>I ❤️ Remix!</marquee>
      </div>
      <div className="counter">
        <p>Views</p>
        <span>{count}</span>
      </div>
    </div>
  );
}
