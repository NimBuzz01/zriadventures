export interface Props {
    icon: any
    title: string
}

const InfoIcon = ({ icon, title }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 text-3xl text-white">
            <div className="flex items-center justify-center rounded-full bg-blue-950 p-5">
                {icon}
            </div>
            <p className="text-xl font-medium text-blue-950">{title}</p>
        </div>
    )
}

export default InfoIcon
