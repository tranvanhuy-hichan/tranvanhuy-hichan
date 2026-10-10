<template>
  <div class="relative min-h-screen bg-[#090d16] light:bg-slate-50 text-slate-100 light:text-slate-800 selection:bg-blue-600 selection:text-white transition-colors duration-200">
    <!-- Top Fixed Sub-Navbar -->
    <header class="sticky top-0 z-40 backdrop-blur-md bg-[#090d16]/95 light:bg-white/95 text-white light:text-slate-900 border-b border-slate-800/80 light:border-slate-200 px-4 sm:px-8 py-3 transition-colors shadow-md light:shadow-sm">
      <div class="max-w-5xl mx-auto flex items-center justify-between">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white light:text-slate-700 light:hover:text-slate-900 transition-colors group"
        >
          <span class="p-1 rounded-md bg-slate-800/90 light:bg-slate-100 border border-slate-700 light:border-slate-300 group-hover:border-slate-500 text-slate-300 light:text-slate-700 group-hover:text-white light:group-hover:text-slate-900 transition-all">
            ←
          </span>
          <span>{{ store.locale === 'vi' ? 'Quay lại Portfolio' : 'Back to Portfolio' }}</span>
        </router-link>

        <div class="flex items-center gap-2.5 sm:gap-3">
          <!-- External links quick access -->
          <a
            v-if="project?.demo && project.demo !== '#'"
            :href="project.demo"
            target="_blank"
            rel="noopener"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <span>Live Demo</span>
            <span class="text-[10px]">↗</span>
          </a>

          <!-- Language Switcher -->
          <div class="flex items-center gap-0.5 bg-slate-800/80 light:bg-slate-100 border border-slate-700/80 light:border-slate-300 rounded-lg p-0.5 font-mono text-[10px]">
            <button
              @click="store.setLocale('en')"
              class="px-2 py-1 rounded-md transition-all cursor-pointer"
              :class="store.locale === 'en' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900'"
            >
              EN
            </button>
            <button
              @click="store.setLocale('vi')"
              class="px-2 py-1 rounded-md transition-all cursor-pointer"
              :class="store.locale === 'vi' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900'"
            >
              VI
            </button>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="store.toggleTheme()"
            class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 hover:bg-white/5 light:hover:bg-black/5 border border-slate-700/80 light:border-slate-300 bg-slate-800/80 light:bg-slate-100 transition-all duration-150 cursor-pointer shrink-0"
            :aria-label="store.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="store.theme === 'dark'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12" v-if="project">
      
      <!-- 1. Header Title & Meta -->
      <div class="mb-8 pb-6 border-b border-slate-800/80 light:border-slate-200">
        <div class="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono">
          <span class="px-2.5 py-0.5 rounded-md bg-blue-600/15 border border-blue-500/30 text-blue-400 light:text-blue-600 font-semibold uppercase">
            {{ project.category }}
          </span>
          <span v-if="project.time" class="px-2.5 py-0.5 rounded-md bg-slate-850 light:bg-slate-100 border border-slate-700/80 light:border-slate-300 text-slate-400 light:text-slate-600">
            {{ project.time }}
          </span>
          <span v-if="project.rankingBadge" class="px-2.5 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-400 light:text-blue-600 font-semibold">
            {{ project.rankingBadge }}
          </span>
        </div>

        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white light:text-slate-900 tracking-tight mb-3 leading-tight">
          {{ project.title }}
        </h1>

        <p class="text-sm sm:text-base text-slate-300 light:text-slate-600 leading-relaxed max-w-3xl">
          {{ project.description }}
        </p>
      </div>

      <!-- 2. Two-Column Clean Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left / Main Column (8 cols): Case Study Details -->
        <div class="lg:col-span-8 space-y-6 sm:space-y-8">
          
          <!-- Project Preview Image -->
          <div
            v-if="project.image"
            class="rounded-xl overflow-hidden border border-slate-800 light:border-slate-200 bg-slate-900 light:bg-white shadow-xl group cursor-pointer relative"
            @click="zoomImage = true"
          >
            <div class="px-3.5 py-2 bg-slate-850 light:bg-slate-100 border-b border-slate-800 light:border-slate-200 flex items-center justify-between text-xs text-slate-400 light:text-slate-600 font-mono">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
              </div>
              <span class="text-[11px] text-slate-500 light:text-slate-600 truncate">Preview Screenshot</span>
              <span class="text-[10px] text-blue-400 light:text-blue-600 group-hover:underline">{{ store.locale === 'vi' ? 'Phóng to ảnh' : 'Zoom image' }}</span>
            </div>
            
            <div class="relative">
              <img
                :src="currentImage"
                :alt="project.title"
                class="w-full h-auto object-cover max-h-[420px]"
              />
              <template v-if="galleryImages.length > 1">
                <button
                  type="button"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white text-lg flex items-center justify-center cursor-pointer"
                  aria-label="Previous image"
                  @click.stop="stepImage(-1)"
                >‹</button>
                <button
                  type="button"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white text-lg flex items-center justify-center cursor-pointer"
                  aria-label="Next image"
                  @click.stop="stepImage(1)"
                >›</button>
                <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-white">
                  {{ activeImage + 1 }} / {{ galleryImages.length }}
                </span>
              </template>
            </div>

            <div
              v-if="galleryImages.length > 1"
              class="flex gap-2 p-2.5 overflow-x-auto bg-slate-900/60 light:bg-slate-100 border-t border-slate-800 light:border-slate-200"
              @click.stop
            >
              <button
                v-for="(img, i) in galleryImages"
                :key="i"
                type="button"
                class="shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 cursor-pointer transition-colors"
                :class="i === activeImage ? 'border-blue-500' : 'border-transparent opacity-70 hover:opacity-100'"
                :aria-label="`Image ${i + 1}`"
                @click="activeImage = i"
              >
                <img :src="img" :alt="`${project.title} ${i + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- 01. Solution Overview -->
          <div class="bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <h2 class="text-base sm:text-lg font-bold text-white light:text-slate-900 mb-3 flex items-center gap-2">
              <span class="text-blue-400 light:text-blue-600 font-mono">01.</span>
              <span>{{ store.locale === 'vi' ? 'Tổng quan & Giải pháp' : 'Project Solution & Overview' }}</span>
            </h2>
            <p class="text-sm text-slate-300 light:text-slate-700 leading-relaxed whitespace-pre-line">
              {{ project.longDesc || project.description }}
            </p>
          </div>

          <!-- 02. My Contribution & Scope -->
          <div class="bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <h2 class="text-base sm:text-lg font-bold text-white light:text-slate-900 mb-4 flex items-center gap-2">
              <span class="text-blue-400 light:text-blue-600 font-mono">02.</span>
              <span>{{ store.ui.myContributionLabel || (store.locale === 'vi' ? 'Đóng góp & Trách nhiệm của tôi' : 'My Contribution & Scope') }}</span>
            </h2>

            <div v-if="project.role" class="mb-4 pb-3 border-b border-slate-800/80 light:border-slate-200">
              <span class="text-xs font-mono text-cyan-400 light:text-blue-600 uppercase tracking-wider block mb-1 font-semibold">
                {{ store.locale === 'vi' ? 'Vai trò đảm nhiệm:' : 'Assigned Role:' }}
              </span>
              <p class="text-sm font-medium text-slate-200 light:text-slate-800">
                {{ project.role }}
              </p>
            </div>

            <ul class="space-y-2.5">
              <li
                v-for="item in (project.contributions || project.responsibilities)"
                :key="item"
                class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed"
              >
                <span class="text-cyan-400 light:text-blue-600 mt-0.5 shrink-0 font-bold">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- 03. Key Engineering Decisions -->
          <div v-if="project.engineeringDecisions?.length" class="bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 class="text-base sm:text-lg font-bold text-white light:text-slate-900 flex items-center gap-2">
              <span class="text-blue-400 light:text-blue-600 font-mono">03.</span>
              <span>{{ store.ui.decisionsLabel || (store.locale === 'vi' ? 'Quyết định Kỹ thuật Then chốt' : 'Key Engineering Decisions') }}</span>
            </h2>

            <div class="grid gap-3 sm:gap-4">
              <div
                v-for="d in project.engineeringDecisions"
                :key="d.decision"
                class="p-3.5 sm:p-4 rounded-xl bg-slate-850/80 light:bg-slate-50 border border-slate-800/90 light:border-slate-200 space-y-1.5"
              >
                <div class="text-xs sm:text-sm font-bold text-cyan-300 light:text-blue-600 flex items-center gap-2">
                  <span>▸</span>
                  <span>{{ d.decision }}</span>
                </div>
                <p class="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed pl-4">
                  {{ d.reason }}
                </p>
              </div>
            </div>
          </div>

          <!-- 04. Technical Challenges & Solutions -->
          <div v-if="project.challengesAndSolutions?.length" class="bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 class="text-base sm:text-lg font-bold text-white light:text-slate-900 flex items-center gap-2">
              <span class="text-blue-400 light:text-blue-600 font-mono">04.</span>
              <span>{{ store.ui.challengesLabel || (store.locale === 'vi' ? 'Thách thức Kỹ thuật & Giải pháp' : 'Technical Challenges & Solutions') }}</span>
            </h2>

            <div class="space-y-3 sm:space-y-4">
              <div
                v-for="item in project.challengesAndSolutions"
                :key="item.challenge"
                class="p-4 rounded-xl bg-slate-850/80 light:bg-slate-50 border border-slate-800/90 light:border-slate-200 space-y-2.5"
              >
                <div class="text-xs sm:text-sm font-semibold text-rose-300 light:text-rose-600 flex items-start gap-2.5">
                  <span class="px-2 py-0.5 rounded bg-rose-500/20 light:bg-rose-100 text-rose-300 light:text-rose-700 border border-rose-500/30 light:border-rose-300 font-mono text-[10px] font-bold uppercase shrink-0 mt-0.5">Problem</span>
                  <span>{{ item.challenge }}</span>
                </div>
                <div class="text-xs sm:text-sm text-emerald-300/90 light:text-emerald-700 flex items-start gap-2.5 pt-2 border-t border-slate-800 light:border-slate-200">
                  <span class="px-2 py-0.5 rounded bg-emerald-500/20 light:bg-emerald-100 text-emerald-300 light:text-emerald-800 border border-emerald-500/30 light:border-emerald-300 font-mono text-[10px] font-bold uppercase shrink-0 mt-0.5">Solution</span>
                  <span>{{ item.solution }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Internal project notice if applicable -->
          <div v-if="project.internal" class="p-4 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 text-slate-300 light:text-slate-700 text-xs flex items-center gap-2.5">
            <svg class="w-4 h-4 text-slate-400 light:text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span>{{ store.locale === 'vi' ? 'Dự án nội bộ tại Digital Twin Group (MakeAI) — Mã nguồn & cơ sở dữ liệu được bảo mật theo chính sách công ty.' : 'Enterprise internal project at Digital Twin Group (MakeAI) — Source code is private.' }}</span>
          </div>

        </div>

        <!-- Right / Sidebar Column (4 cols): Quick Specs & Action Links -->
        <div class="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          
          <!-- Actions Card -->
          <div class="bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl p-5 shadow-lg light:shadow-sm">
            <h3 class="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-500 font-semibold mb-3">
              {{ store.locale === 'vi' ? 'Liên kết trực tiếp' : 'Project Links' }}
            </h3>
            
            <div class="space-y-2.5">
              <a
                v-if="project.demo && project.demo !== '#'"
                :href="project.demo"
                target="_blank"
                rel="noopener"
                class="w-full btn-primary text-xs py-2.5 px-4 justify-center"
              >
                <span>Live Demo</span>
                <span>↗</span>
              </a>

              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-700 light:border-slate-300 bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-xs font-medium text-slate-200 light:text-slate-800 hover:text-white light:hover:text-slate-900 transition-all"
              >
                <IconGithub class="w-4 h-4" />
                <span>{{ project.githubBackend ? 'Frontend Code' : 'Source Code' }}</span>
              </a>

              <a
                v-if="project.githubBackend"
                :href="project.githubBackend"
                target="_blank"
                rel="noopener"
                class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-700 light:border-slate-300 bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-xs font-medium text-slate-200 light:text-slate-800 hover:text-white light:hover:text-slate-900 transition-all"
              >
                <IconGithub class="w-4 h-4" />
                <span>Backend Code</span>
              </a>

              <a
                v-if="project.video"
                :href="project.video"
                target="_blank"
                rel="noopener"
                class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-purple-500/40 light:border-purple-300 bg-purple-500/10 light:bg-purple-50 hover:bg-purple-500/20 light:hover:bg-purple-100 text-xs font-medium text-purple-300 light:text-purple-700 transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <span>Watch Video Demo</span>
              </a>

              <div v-if="!project.github && !project.demo && !project.video" class="text-xs text-slate-500 italic text-center py-1">
                {{ store.locale === 'vi' ? 'Dự án doanh nghiệp bảo mật mã nguồn.' : 'Private enterprise project.' }}
              </div>
            </div>
          </div>

          <!-- Tech Stack Card -->
          <div class="bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl p-5 shadow-lg light:shadow-sm">
            <h3 class="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-500 font-semibold mb-3">
              {{ store.locale === 'vi' ? 'Công nghệ sử dụng' : 'Tech Stack' }}
            </h3>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-slate-800 light:bg-slate-100 text-cyan-300 light:text-blue-700 border border-slate-700 light:border-slate-300"
              >
                <img
                  v-if="getTechLogo(tag)"
                  :src="getTechLogo(tag)"
                  :alt="tag"
                  class="w-3.5 h-3.5 object-contain shrink-0"
                  loading="lazy"
                />
                <span>{{ tag }}</span>
              </span>
            </div>
          </div>

          <!-- Quick Metadata Card -->
          <div class="bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl p-5 shadow-lg light:shadow-sm space-y-3 text-xs">
            <h3 class="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-500 font-semibold mb-2">
              {{ store.locale === 'vi' ? 'Thông tin tóm tắt' : 'Quick Details' }}
            </h3>
            
            <div class="flex items-center justify-between pb-2 border-b border-slate-800 light:border-slate-200">
              <span class="text-slate-400 light:text-slate-500">{{ store.locale === 'vi' ? 'Thể loại' : 'Category' }}</span>
              <span class="font-semibold text-slate-200 light:text-slate-800 uppercase font-mono">{{ project.category }}</span>
            </div>

            <div class="flex items-center justify-between pb-2 border-b border-slate-800 light:border-slate-200">
              <span class="text-slate-400 light:text-slate-500">{{ store.locale === 'vi' ? 'Thời gian' : 'Timeline' }}</span>
              <span class="font-medium text-slate-200 light:text-slate-800 font-mono">{{ project.time || 'N/A' }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-slate-400 light:text-slate-500">{{ store.locale === 'vi' ? 'Trạng thái' : 'Status' }}</span>
              <span class="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{{ store.locale === 'vi' ? 'Hoàn thành' : 'Completed' }}</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- 3. Bottom Next / Previous Project Navigation -->
      <div class="mt-14 pt-8 border-t border-slate-800 light:border-slate-200 flex items-center justify-between">
        <router-link
          v-if="prevProject"
          :to="`/projects/${prevProject.id}`"
          class="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors group"
        >
          <span class="p-2 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 group-hover:border-slate-600 light:group-hover:border-slate-400 transition-colors">
            ←
          </span>
          <div class="text-left">
            <span class="text-[10px] font-mono text-slate-500 light:text-slate-400 block uppercase">
              {{ store.locale === 'vi' ? 'Dự án trước' : 'Previous' }}
            </span>
            <span class="font-semibold text-slate-200 light:text-slate-800 group-hover:text-blue-400 light:group-hover:text-blue-600 truncate max-w-[150px] sm:max-w-[200px] block">
              {{ prevProject.title }}
            </span>
          </div>
        </router-link>
        <div v-else></div>

        <router-link
          v-if="nextProject"
          :to="`/projects/${nextProject.id}`"
          class="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors group text-right"
        >
          <div class="text-right">
            <span class="text-[10px] font-mono text-slate-500 light:text-slate-400 block uppercase">
              {{ store.locale === 'vi' ? 'Dự án tiếp theo' : 'Next' }}
            </span>
            <span class="font-semibold text-slate-200 light:text-slate-800 group-hover:text-blue-400 light:group-hover:text-blue-600 truncate max-w-[150px] sm:max-w-[200px] block">
              {{ nextProject.title }}
            </span>
          </div>
          <span class="p-2 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 group-hover:border-slate-600 light:group-hover:border-slate-400 transition-colors">
            →
          </span>
        </router-link>
        <div v-else></div>
      </div>

    </main>

    <!-- Project Not Found State -->
    <div v-else class="max-w-md mx-auto text-center py-28 px-4">
      <div class="text-4xl mb-3">🔍</div>
      <h2 class="text-xl font-bold text-white light:text-slate-900 mb-2">
        {{ store.locale === 'vi' ? 'Không tìm thấy thông tin dự án' : 'Project Not Found' }}
      </h2>
      <p class="text-slate-400 light:text-slate-600 text-xs mb-6">
        {{ store.locale === 'vi' ? 'Vui lòng chọn một dự án khác từ trang chủ.' : 'Please pick another project from the home page.' }}
      </p>
      <router-link to="/" class="btn-primary text-xs px-5 py-2">
        ← {{ store.locale === 'vi' ? 'Về Portfolio' : 'Back to Portfolio' }}
      </router-link>
    </div>

    <!-- Image Lightbox Modal -->
    <Transition name="fade">
      <div
        v-if="zoomImage && project?.image"
        class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        @click="zoomImage = false"
      >
        <button
          @click="zoomImage = false"
          class="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800/90 border border-slate-700 text-white flex items-center justify-center text-sm cursor-pointer hover:bg-slate-700"
        >
          ✕
        </button>
        <button
          v-if="galleryImages.length > 1"
          type="button"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/90 border border-slate-700 text-white text-xl flex items-center justify-center cursor-pointer hover:bg-slate-700"
          aria-label="Previous image"
          @click.stop="stepImage(-1)"
        >‹</button>
        <img
          :src="currentImage"
          :alt="project.title"
          class="max-w-full max-h-[88vh] object-contain rounded-lg shadow-2xl border border-slate-700"
        />
        <button
          v-if="galleryImages.length > 1"
          type="button"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/90 border border-slate-700 text-white text-xl flex items-center justify-center cursor-pointer hover:bg-slate-700"
          aria-label="Next image"
          @click.stop="stepImage(1)"
        >›</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePortfolioStore } from '@/stores/portfolioStore'
import IconGithub from '@/components/icons/IconGithub.vue'

const route = useRoute()
const store = usePortfolioStore()
const zoomImage = ref(false)
// Gallery: a project may have several screenshots (every image in its images/ folder).
const activeImage = ref(0)
const galleryImages = computed(() => {
  const list = project.value?.images
  if (list && list.length) return list
  return project.value?.image ? [project.value.image] : []
})
const currentImage = computed(() => galleryImages.value[activeImage.value] || project.value?.image || '')
const stepImage = (delta) => {
  const n = galleryImages.value.length
  if (n > 1) activeImage.value = (activeImage.value + delta + n) % n
}

const project = computed(() => {
  const id = Number(route.params.id)
  return store.projects.find((p) => p.id === id)
})

const currentIndex = computed(() => {
  return store.projects.findIndex((p) => p.id === Number(route.params.id))
})

const prevProject = computed(() => {
  if (currentIndex.value > 0) {
    return store.projects[currentIndex.value - 1]
  }
  return null
})

watch(() => route.params.id, () => { activeImage.value = 0 })

const nextProject = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < store.projects.length - 1) {
    return store.projects[currentIndex.value + 1]
  }
  return null
})

const techLogoMap = {
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  'Spring Security': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  'Vue 3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  'Vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'Frappe': 'https://cdn.simpleicons.org/frappe/0089FF',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'Tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'Capacitor': 'https://cdn.simpleicons.org/capacitor/119EFF',
  'WebSocket': 'https://cdn.simpleicons.org/websocket/62B5E5',
  'OpenClaw': 'https://cdn.simpleicons.org/openai/10A37F',
  'Agentic AI': 'https://cdn.simpleicons.org/openai/10A37F',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
  'JWT': 'https://cdn.simpleicons.org/jsonwebtokens/000000',
  'Prisma': 'https://cdn.simpleicons.org/prisma/white',
  'PostGIS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'GIS Maps': 'https://cdn.simpleicons.org/leaflet/199900',
}

function getTechLogo(tag) {
  if (!tag) return null
  const trimmed = tag.trim()
  return techLogoMap[trimmed] || null
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})

watch(
  () => route.params.id,
  () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
