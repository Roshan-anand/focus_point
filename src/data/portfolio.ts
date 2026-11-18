export type Frame = {
  name: string
  file: string
  alt: string
}

export const INSTAGRAM_URL = 'https://www.instagram.com/'
export const STUDIO_INSTAGRAM_URL = `${INSTAGRAM_URL}focus_point_sullia/`

export const PORTRAIT_FRAME: Frame = {
  name: 'The portrait',
  file: 'portrait',
  alt: 'A boy rests his smiling face in his palms in the shade.',
}

export const JASMINE_FRAME: Frame = {
  name: 'The jasmine',
  file: 'jasmine',
  alt: 'A bride in ivory, wearing a jasmine garland, beneath the trees.',
}

export const EMBRACE_FRAME: Frame = {
  name: 'The embrace',
  file: 'meadow',
  alt: 'A couple holding each other in the long grass.',
}

export const FRAMES: readonly Frame[] = [
  PORTRAIT_FRAME,
  JASMINE_FRAME,
  EMBRACE_FRAME,
]
