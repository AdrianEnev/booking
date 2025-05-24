export default function Reviews() {
    return (
        <div className="w-full h-[650px]">
            <p className="text-4xl text-gray-700 font-medium my-2">Отзиви</p>

            <div className="w-full h-[620px] flex flex-wrap flex-row gap-x-3 gap-y-3 p-3">
                <div className="review-box">
                    <p>Гошо Георгиев</p>
                </div>
                <div className="review-box">
                    <p>Иван Иванов</p>
                </div>
                <div className="review-box">
                    <p>Димитър Димитров</p>
                </div>
                <div className="review-box">
                    <p>Петър Петров</p>
                </div>
                <div className="review-box">
                    <p>Мишо Мишката</p>
                </div>
                <div className="review-box">
                    <p>Петьо Пуйката</p>
                </div>
            </div>
        </div>
    )
}
