import personalData from '@/data/personal/personal.json'
import skillsData from '@/data/skills.json'
import experiencesData from '@/data/experiences.json'
import educationData from '@/data/education.json'
import whatIBuildData from '@/data/whatIBuild.json'
import statsData from '@/data/stats.json'
import uiData from '@/data/ui.json'

import { projectSources } from "./projectSources";

const personalImageList: string[] = [];
const detectedAvatar: string = (personalData as any).avatar || "";

// Build raw projects list with auto-attached images and metadata
const rawProjects: any[] = []
for (const src of projectSources) {
  const config = src.config
  if (config.hidden) continue

  const folder = src.folder
  const images = src.images
  const coverImage = images.length > 0 ? images[0] : (config.image || `/${folder}.png` || '/logo.png')

  rawProjects.push({
    ...config,
    slug: folder,
    image: coverImage,
    images: images,
    // Flag to determine if the project should be displayed initially before expanding
    showInitial: config.showInitial !== undefined ? Boolean(config.showInitial) : (config.featured ?? true),
    order: config.order !== undefined ? Number(config.order) : 999
  })
}

// Sort projects dynamically by order (ascending), then featured, then id (descending)
rawProjects.sort((a: any, b: any) => {
  if (a.order !== b.order) {
    return a.order - b.order
  }
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1
  return (b.id || 0) - (a.id || 0)
})

/** `overrides` = profile and stats saved in the database; the JSON files are the defaults. */
export function loadPortfolioData(overrides?: { personal?: any; stats?: any } | null): any {
  const pd: any = overrides?.personal ?? personalData;
  const sd: any[] = Array.isArray(overrides?.stats) ? overrides!.stats : (statsData as any[]);
  // Build localized data structure
  const buildLocaleData = (lang: string): any => {
    return {
      personal: {
        email: pd.email,
        // phone / Zalo: profile saved in the database may predate these fields, fall back to the JSON defaults
        phone: pd.phone || (personalData as any).phone,
        zalo: pd.zalo || (personalData as any).zalo,
        location: pd.location,
        avatar: pd.avatar || detectedAvatar,
        avatars: personalImageList,
        cv: pd.cv,
        website: pd.website,
        socials: pd.socials,
        ...pd[lang]
      },
      stats: sd.map((s: any) => ({
        value: s.value,
        label: (s as any)[lang]?.label || s.value
      })),
      whatIBuild: whatIBuildData.map((w: any) => ({
        icon: w.icon,
        tags: w.tags,
        title: (w as any)[lang]?.title || '',
        desc: (w as any)[lang]?.desc || ''
      })),
      projects: rawProjects.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        category: p.category,
        featured: p.featured,
        showInitial: p.showInitial,
        order: p.order,
        internal: p.internal,
        time: p.time,
        github: p.github,
        githubBackend: p.githubBackend,
        demo: p.demo,
        video: p.video,
        tags: p.tags,
        image: p.image,
        images: p.images,
        title: (p as any)[lang]?.title || p.title || '',
        description: (p as any)[lang]?.description || p.description || '',
        longDesc: (p as any)[lang]?.longDesc || p.longDesc || '',
        role: (p as any)[lang]?.role || p.role || '',
        responsibilities: (p as any)[lang]?.responsibilities || p.responsibilities || [],
        engineeringDecisions: (p as any)[lang]?.engineeringDecisions || p.engineeringDecisions || [],
        challengesAndSolutions: (p as any)[lang]?.challengesAndSolutions || p.challengesAndSolutions || []
      })),
      experiences: experiencesData.map((e: any) => ({
        id: e.id,
        company: e.company,
        period: e.period,
        type: e.type,
        tech: e.tech,
        position: (e as any)[lang]?.position || '',
        duration: (e as any)[lang]?.duration || '',
        description: (e as any)[lang]?.description || []
      })),
      education: educationData.list.map(edu => ({
        id: edu.id,
        period: edu.period,
        gpa: edu.gpa,
        type: edu.type,
        logo: edu.logo,
        school: (edu as any)[lang]?.school || '',
        degree: (edu as any)[lang]?.degree || '',
        description: (edu as any)[lang]?.description || ''
      })),
      academicFocus: (educationData as any).academicFocus[lang] || {},
      ui: (uiData as any)[lang] || {}
    }
  }

  return {
    skillCategoriesList: skillsData,
    en: buildLocaleData('en'),
    vi: buildLocaleData('vi')
  }
}
