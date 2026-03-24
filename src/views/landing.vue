<script setup lang="ts">
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
</script>

<template>
  <div class="min-h-screen bg-base-300 relative overflow-hidden">

    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[500px] h-[400px] bg-secondary/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

    <nav class="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4.5 h-4.5 text-primary">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
            <polyline points="16 7 22 7 22 13"/>
          </svg>
        </div>
        <span class="text-lg font-semibold tracking-tight text-base-content">PortfolioTracker</span>
      </div>
      <div class="flex items-center gap-3">
        <ThemeToggle />
        <router-link to="/auth" class="btn btn-primary btn-sm">
          Sign in
        </router-link>
      </div>
    </nav>

    <section class="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-20">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          <span class="text-xs font-medium text-primary">Powered by Azure Cloud</span>
        </div>

        <h1 class="text-4xl sm:text-5xl font-bold text-base-content leading-tight mb-5">
          Track your portfolio.
          <br/>
          <span class="text-primary">Get market signals.</span>
        </h1>

        <p class="text-lg text-base-content/50 leading-relaxed mb-8 max-w-lg">
          Manage your investment portfolios, configure signal rules for technical indicators, and get notified when conditions are triggered.
        </p>

        <div class="flex items-center gap-4">
          <router-link to="/auth" class="btn btn-primary">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </router-link>
          <a href="#features" class="btn btn-ghost text-base-content/50 hover:text-base-content">
            Learn more
          </a>
        </div>
      </div>

      <div class="mt-14 rounded-xl border border-base-content/5 bg-base-200/60 backdrop-blur-sm p-1 shadow-2xl shadow-black/30">
        <div class="rounded-lg bg-base-200 overflow-hidden">
          <div class="flex items-center gap-2 px-4 py-3 border-b border-base-content/5">
            <div class="w-2.5 h-2.5 rounded-full bg-rose-500/60"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-amber-500/60"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
            <div class="flex-1 flex justify-center">
              <div class="px-4 py-1 rounded-md bg-base-300/50 text-xs text-base-content/30">portfoliotracker.azurewebsites.net</div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-4 gap-3 mb-5">
              <div v-for="i in 4" :key="i" class="bg-base-300/50 rounded-lg p-4">
                <div class="h-2 w-12 bg-base-content/10 rounded mb-2"></div>
                <div class="h-4 w-20 bg-base-content/15 rounded"></div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-base-300/50 rounded-lg p-4 h-36">
                <svg viewBox="0 0 300 80" class="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="rgb(16, 185, 129)" stop-opacity="0.2"/>
                      <stop offset="100%" stop-color="rgb(16, 185, 129)" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0 60 Q30 55 60 50 T120 35 T180 40 T240 20 T300 15 L300 80 L0 80Z" fill="url(#chartGrad)"/>
                  <path d="M0 60 Q30 55 60 50 T120 35 T180 40 T240 20 T300 15" fill="none" stroke="rgb(16, 185, 129)" stroke-width="2"/>
                </svg>
              </div>
              <div class="bg-base-300/50 rounded-lg p-4 h-36">
                <div class="space-y-3">
                  <div v-for="i in 3" :key="i" class="flex items-center gap-3">
                    <div class="w-7 h-7 rounded-md" :class="i % 2 === 0 ? 'bg-rose-500/10' : 'bg-emerald-500/10'"></div>
                    <div class="flex-1">
                      <div class="h-2 w-16 bg-base-content/15 rounded mb-1.5"></div>
                      <div class="h-2 w-28 bg-base-content/8 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="relative z-10 max-w-6xl mx-auto px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-2xl font-bold text-base-content mb-2">Key features</h2>
        <p class="text-base-content/40">What the application offers</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div class="bg-base-200 border border-base-content/5 rounded-xl p-6 hover:border-primary/20 transition-colors">
          <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5 text-primary">
              <rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>
            </svg>
          </div>
          <h3 class="font-semibold text-base-content mb-2">Portfolio Management</h3>
          <p class="text-sm text-base-content/40 leading-relaxed">
            Create and track multiple portfolios with live market data from Yahoo Finance. View positions, P&L, and allocation breakdown.
          </p>
        </div>


        <div class="bg-base-200 border border-base-content/5 rounded-xl p-6 hover:border-primary/20 transition-colors">
          <div class="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5 text-emerald-400">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
            </svg>
          </div>
          <h3 class="font-semibold text-base-content mb-2">Market Signals</h3>
          <p class="text-sm text-base-content/40 leading-relaxed">
            Set up rules using RSI, MACD, SMA20/50/200 indicators. The system generates BUY/SELL signals based on your thresholds.
          </p>
        </div>


        <div class="bg-base-200 border border-base-content/5 rounded-xl p-6 hover:border-primary/20 transition-colors">
          <div class="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5 text-secondary">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          </div>
          <h3 class="font-semibold text-base-content mb-2">Push Notifications</h3>
          <p class="text-sm text-base-content/40 leading-relaxed">
            Get push notifications through Azure Notification Hubs. Real-time updates delivered via SignalR websockets.
          </p>
        </div>
      </div>
    </section>

    <section class="relative z-10 max-w-6xl mx-auto px-8 py-12">
      <div class="bg-base-200/50 border border-base-content/5 rounded-xl px-8 py-6">
        <p class="text-xs font-medium text-base-content/30 uppercase tracking-wider text-center mb-5">Built with</p>
        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span class="text-sm text-base-content/40 font-medium">.NET Web API</span>
          <span class="text-base-content/10">|</span>
          <span class="text-sm text-base-content/40 font-medium">Vue.js</span>
          <span class="text-base-content/10">|</span>
          <span class="text-sm text-base-content/40 font-medium">Azure App Service</span>
          <span class="text-base-content/10">|</span>
          <span class="text-sm text-base-content/40 font-medium">Azure Functions</span>
          <span class="text-base-content/10">|</span>
          <span class="text-sm text-base-content/40 font-medium">SignalR</span>
          <span class="text-base-content/10">|</span>
          <span class="text-sm text-base-content/40 font-medium">Notification Hubs</span>
        </div>
      </div>
    </section>

    <section class="relative z-10 max-w-6xl mx-auto px-8 pt-8 pb-20 text-center">
      <h2 class="text-2xl font-bold text-base-content mb-3">Try it out</h2>
      <p class="text-base-content/40 mb-6">Create an account and set up your first portfolio.</p>
      <router-link to="/auth" class="btn btn-primary">
        Get Started
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </router-link>
    </section>

    <footer class="relative z-10 border-t border-base-content/5 px-8 py-6">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <span class="text-xs text-base-content/30">PortfolioTracker — Praca licencjacka 2026</span>
        <span class="text-xs text-base-content/20">Clean Architecture + Azure</span>
      </div>
    </footer>
  </div>
</template>
