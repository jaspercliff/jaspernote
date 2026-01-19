import React from 'react';
import Layout from '@theme/Layout';

export default function Hello(): JSX.Element {
  return (
    <Layout 
      title="Hello" 
      description="Hello React Page"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}
      >
        <p>
          Edit <code>src/pages/helloReact.tsx</code> and save to reload.
        </p>
      </div>
    </Layout>
  );
}
