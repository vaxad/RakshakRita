import { Waveform } from '@uiball/loaders'

export default function Loading() {
    return (
        <div className=' flex w-full min-h-[60vh] overflow-x-hidden justify-center items-center '>
            <Waveform
                size={70}
                lineWeight={5}
                speed={1}
                color="#262c69"
            />
        </div>
    )
}
