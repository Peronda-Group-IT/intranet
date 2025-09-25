import TiffViewer from "@/components/tiff-renderer";

export default function TestPage(){
    return(
        <div className="w-full flex items-center">
            <TiffViewer src={'http://localhost:5000/render?path=/RAIZ/PERONDA/DESPIECES/KAIZEN%20WALL/43066_KAIZEN_HONEY_DECOR_SP_33X100_R_02.tif'} />
        </div>
    )
}