'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-full w-full px-4 py-32 flex items-center justify-center bg-gray-950">
      <section className="text-white">
        <div>
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              data-cy="home-title"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              Master the Market.
              <span className="sm:block"> Build Wealth. </span>
            </motion.h1>

            <motion.p
              data-cy="home-description"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-white"
            >
              Join over 750,000 traders in the world’s leading firm. Trade in a fully simulated environment and earn up to 100% rewards.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Link href="/stocks">
                <motion.div
                  data-cy="explore-stocks-title"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                >
                  Explore Stocks
                </motion.div>
              </Link>

              <Link href="https://fundingpips.com/" target='_blank'>
                <motion.div
                  data-cy="start-trading-title"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className=" block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                >
                  Start Trading
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
