import Head from 'next/head';
import { useState } from 'react';
import { JsonLd } from 'react-schemaorg';

export default function Home() {
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setKeywords([]);

    try {
      const response = await fetch('/api/fetch-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch keywords');
      }

      const data = await response.json();
      setKeywords(data.keywords);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Extractor Toolify Top Keywords | Enhance Your SEO Strategy</title>
        <meta name="description" content="Elevate your SEO game with Extractor Toolify Top Keywords. Analyze any webpage and uncover valuable keyword insights to optimize your content strategy." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourdomain.com/" />
        <meta property="og:title" content="Extractor Toolify Top Keywords | Enhance Your SEO Strategy" />
        <meta property="og:description" content="Elevate your SEO game with Extractor Toolify Top Keywords. Analyze any webpage and uncover valuable keyword insights to optimize your content strategy." />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Extractor Toolify Top Keywords | Enhance Your SEO Strategy" />
        <meta name="twitter:description" content="Elevate your SEO game with Extractor Toolify Top Keywords. Analyze any webpage and uncover valuable keyword insights to optimize your content strategy." />
      </Head>

      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Extractor Toolify Top Keywords",
          "description": "A powerful tool to extract and analyze keywords from webpages for SEO optimization.",
          "applicationCategory": "SEOApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#" className="text-indigo-600 text-2xl font-bold">
                  Extractor Toolify Top Keywords
                </a>
              </div>
              <nav className="hidden md:flex space-x-10">
                <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Home
                </a>
                <a href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Features
                </a>
                <a href="#faq" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Q&A
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-indigo-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Extractor Toolify Top Keywords</span>
                <span className="block text-indigo-200">Supercharge Your SEO</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-indigo-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Elevate your content strategy with our advanced keyword extraction tool. Analyze any webpage and unlock powerful SEO insights in moments.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-grow py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl font-semibold mb-6 text-center">Extract Keywords</h2>
                  <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL"
                        required
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none hover:bg-indigo-600"
                      disabled={loading}
                    >
                      {loading ? 'Analyzing...' : 'Extract Keywords'}
                    </button>
                  </form>
                  {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                  {keywords.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">Keyword</th>
                            <th scope="col" className="px-6 py-3">Traffic</th>
                            <th scope="col" className="px-6 py-3">CPC</th>
                          </tr>
                        </thead>
                        <tbody>
                          {keywords.map((keyword, index) => (
                            <tr key={index} className="bg-white border-b">
                              <td className="px-6 py-4">{keyword.keyword}</td>
                              <td className="px-6 py-4">{keyword.traffic}</td>
                              <td className="px-6 py-4">{keyword.cpc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="bg-white py-12" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-indigo-50 rounded-lg">
                <h3 className="text-lg font-medium text-indigo-600 mb-2">Lightning-Fast Analysis</h3>
                <p className="text-gray-600">Get comprehensive keyword insights for any webpage within seconds.</p>
              </div>
              <div className="p-6 bg-indigo-50 rounded-lg">
                <h3 className="text-lg font-medium text-indigo-600 mb-2">In-Depth Metrics</h3>
                <p className="text-gray-600">Access detailed traffic estimates and CPC data for each extracted keyword.</p>
              </div>
              <div className="p-6 bg-indigo-50 rounded-lg">
                <h3 className="text-lg font-medium text-indigo-600 mb-2">SEO Strategy Booster</h3>
                <p className="text-gray-600">Enhance your content strategy with actionable keyword intelligence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Q&A Section */}
        <section id="faq" aria-labelledby="faq-heading" className="bg-gray-50 py-12 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">How does Extractor Toolify Top Keywords work?</h3>
                <p className="text-gray-600">Our advanced algorithm analyzes the content of the provided URL, extracts relevant keywords, and provides traffic and CPC estimates for each keyword using aggregated data from multiple trusted sources.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Is there a limit to the number of URLs I can analyze?</h3>
                <p className="text-gray-600">Currently, you can analyze one URL at a time. We're developing a batch processing feature for future releases to enhance productivity.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">How reliable are the traffic and CPC estimates?</h3>
                <p className="text-gray-600">Our estimates are derived from comprehensive data aggregation and analysis. While they provide valuable insights, please note that actual values may vary based on real-time market conditions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2024 Extractor Toolify Top Keywords. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}