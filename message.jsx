import { MessageCircleWarning } from 'lucide-react'
import { useState, useEffect } from 'react'

function WelcomePopup() {
  const [showMessage, setShowMessage] = useState(false)

  // useEffect(() => {
  //   const hasSeenMessage = localStorage.getItem('hasSeenWelcome')

  //   if (!hasSeenMessage) {
  //     setShowMessage(true)
  //     localStorage.setItem('hasSeenWelcome', 'true')
  //   }
  // }, [])

  const handleAccept = () => {
    setShowMessage(false)
  }

  return (
    <>
      {showMessage && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
        <div className="p-6 max-w-sm text-center bg-white rounded-2xl border-2 border-red-500 shadow-xl">
  <h2 className="mb-4 text-xl font-bold text-red-600">Warning</h2>
  <p className="mb-4 text-sm text-red-700">
    <MessageCircleWarning/> <strong>تحذير رسمي:</strong><br />
    يُمنع منعًا باتًا نسخ أو إعادة نشر أو توزيع أي محتوى موجود داخل هذه الصفحة، خاصةً ما يتعلق بـ <strong>جمال الدين</strong> و <strong>بسملة</strong>.<br />
    أي محاولة لاستخدام المحتوى بأي شكل بدون إذن رسمي ستُعتبر انتهاكًا لحقوق الملكية الفكرية، وسيتم التعامل معها قانونيًا وفقًا لـ <strong>سياسة الخصوصية والشروط القانونية المعتمدة.</strong><br />
    نحن نحتفظ بحق اتخاذ الإجراءات القانونية الكاملة تجاه أي مخالفات.
    بالضغط على موافق، فإنك توافق على هذه الشروط وسيتم إعتمادها.
    سيتم اعتبار المستخدم من  ال ip الخاص به وسنعتبر اي انتهاك بعد الضغط على موافق هو مخالفه وسيتم استخدام الحق القانوني للتعامل
    وشكرا لكم.
  </p>
  
  <button
    onClick={handleAccept}
    className="px-4 py-2 font-semibold text-white bg-red-600 rounded-full transition hover:bg-red-700"
  >
    موافق
  </button>
</div>

        </div>
      )}
    </>
  )
}

export default WelcomePopup
