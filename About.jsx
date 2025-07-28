import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Mail, Github, ShieldCheck, Info, Lock } from "lucide-react"

export default function Footer() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-8 lg:px-24 text-gray-800">
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-600 w-6 h-6" />
            <CardTitle className="text-2xl sm:text-3xl font-semibold">
              سياسة الخصوصية وحماية البيانات
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 leading-relaxed text-[17px]">
          <section>
            <h2 className="text-xl font-semibold mb-2">من نحن</h2>
            <p>
              هذا الموقع مملوك ومدار بواسطة <strong>Mohamed Aly✦</strong>. نحن نُولي أهمية كبيرة  
              للخصوصية والشفافية، ونسعى لتقديم تجربة آمنة وخالية من التتبع غير المصرّح به.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">البيانات التي نقوم بجمعها</h2>
            <p>
              لا نقوم بجمع أي بيانات شخصية بشكل مباشر دون إذنك. قد يتم حفظ بيانات الاستخدام لتحسين تجربة المستخدم فقط (مثل الوقت المستغرق داخل الصفحات، وأداء التفاعل).
              لمعرفه المزيد يمكنك تصفح صفحه الاعدادات
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">كيف نستخدم البيانات</h2>
            <p>
              أي بيانات يتم جمعها تُستخدم فقط لتحسين الأداء أو الأمان، ولا يتم مشاركتها مع أي طرف ثالث. نحن لا نبيع أو نؤجر بيانات المستخدم تحت أي ظرف.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">حقوق النشر والاستخدام</h2>
            <p>
              جميع المحتويات والرموز البرمجية والتصميمات الموجودة في هذا الموقع محفوظة الحقوق © {new Date().getFullYear()} <strong>mohamedalyx546@gmail.com✦</strong>.
             لا يسمح باخذ ونشر اي محتوى كصور ومقاطع صوت دون اذن من المستخدمين (بسمله, جمال الدين )
              لا يُسمح بإعادة النشر أو النسخ أو إعادة التوزيع بدون إذن خطي.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">أمان المعلومات</h2>
            <p>
              نستخدم أحدث وسائل التشفير لحماية البيانات الحساسة (إن وُجدت). كل عمليات المعالجة تتم بأمان داخلي، ونضمن عدم الوصول غير المصرح به.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">التواصل معنا</h2>
            <ul className="space-y-2 mt-3">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <a href="mailto:mohamedalix546@gmail.com" className="hover:underline">mohamedalix546@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="w-5 h-5 text-gray-800" />
                <a href="https://github.com/m0hvmedali" target="_blank" className="hover:underline">
                  github.com/m0hvmedali
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-600" />
                <span>مدير الموقع: محمد ✦</span>
              </li>
            </ul>
          </section>
          <section className="text-center mt-6">
            <a 
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <span>الرجوع للموقع</span>
            </a>
          </section>

          <div className="pt-6 text-center text-gray-500 text-sm border-t border-gray-200">
            <Lock className="inline w-4 h-4 mr-1 mb-1" />
            جميع الحقوق محفوظة © {new Date().getFullYear()} محمد ✦. لاستخدامك لهذا الموقع فأنت توافق ضمنيًا على سياسة الخصوصية.
            تمت موافقتك فور دخول الموقع على سياسه الخصوصيه  المذكوره وانه في حال تم نسخ او اخذ صور من الموقع دون الاذن سيتم المحاسبه وفقا لسياسه خصوصيه جوجل لسنه 2025 
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
