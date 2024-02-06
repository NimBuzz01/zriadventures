import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import { MdReviews } from 'react-icons/md'
import BlurImage from '../../../components/common/blur-image'

interface TestimonialCardTypes {
    name: string
    location: string
    stars: number
    review: string
    image: string
}

const TestimonialCard = ({
    name,
    location,
    review,
    stars,
    image,
}: TestimonialCardTypes) => {
    return (
        <div className="min-w-80 md:min-w-96 flex h-[500px] flex-col rounded-md border-[1px] bg-white p-4">
            <div className="flex justify-center gap-2 py-4 text-4xl">
                {[...Array(5)].map((_, index) => (
                    <AiFillStar
                        key={index}
                        className={
                            index < stars ? 'text-yellow-400' : 'text-gray-400'
                        }
                    />
                ))}
            </div>
            <div className="px-2">
                <MdReviews className="text-3xl text-green-600" />
                <p className="text-md text-gray-600">{review}</p>
            </div>
            <div className="mt-auto flex gap-4">
                <div className="relative h-14 w-14">
                    <BlurImage
                        src={`/${image}`}
                        alt="Testimonial Profile Image"
                        objectFit="cover"
                        style="rounded-full"
                    />
                </div>
                <div>
                    <p className="text-lg font-medium uppercase">{name}</p>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard
