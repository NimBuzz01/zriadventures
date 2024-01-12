import Head from 'next/head'
import { Metadata } from 'next'
import ExperienceContent from './ExperienceContent'
import { EXPERIENCE_SHORT_DESCRIPTION_TITLE } from '@/constants/pages/ExperiencesPageConstants'

export const metadata: Metadata = {
    title: 'Experiences - ZRI Adventures',
    description: EXPERIENCE_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

type Props = {
    params: {
        experienceId: string
    }
}

const Experience = ({ params: { experienceId } }: Props) => {
    return (
        <>
            <Head>
                <title>Experiences - ZRI Adventures</title>
                <meta
                    name="Experiences - ZRI Adventures"
                    content={EXPERIENCE_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <ExperienceContent experienceId={experienceId} />
        </>
    )
}

export default Experience
