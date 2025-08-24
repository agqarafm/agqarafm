
# SuperSite — GitHub Pages üçün tam funksional sayt

Müasir, vizual və sürətli statik sayt. Portfel, qalereya, bloq və əlaqə bölmələri var.

## Qurulum

1. Bu faylları öz GitHub hesabınızda **yeni repository**-yə yükləyin (məsələn, `supersite`).
2. `Settings → Pages` bölümünə keçin, **Source** olaraq `Deploy from a branch`, sonra **Branch** olaraq `main` və `/ (root)` seçin. **Save**.
3. Bir neçə saniyədən sonra saytınız `https://<istifadəçi-adı>.github.io/<repo-adı>/` ünvanında açılacaq.
4. Kontakt formu üçün [Formspree](https://formspree.io/) hesabı açın və `index.html` daxilində `action` hissəsində `your-id` yerinə öz ID-nizi yazın.
5. `data/blog.json` faylını redaktə edərək bloq yazılarını artıra bilərsiniz.

## Lokal test
Sadəcə `index.html` faylını brauzerdə açın. Bloq JSON-u üçün bəzi brauzerlərdə `file://` CORS məhdudiyyəti ola bilər; belə hal olarsa, kiçik bir lokal serverlə açın:
```bash
python -m http.server 8080
```
və `http://localhost:8080` açın.

## Fərdiləşdirmə
- Rənglər: `styles.css` içində `:root` dəyişənlərini tənzimləyin.
- Logo və şəkillər: `assets/` qovluğuna yükləyin və istinadları yeniləyin.
- Domen: `Settings → Pages` altında `Custom domain` ilə öz domeninizi qoşun.

Uğurlar!
