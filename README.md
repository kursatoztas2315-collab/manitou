# Anadolu Manitou — SEO ve favicon düzeltilmiş proje

**Hedef adres:** https://anadolumanitou.site/

## Yapılan düzeltmeler

- `robots.txt` mevcut dosyası site haritasını gösterecek biçimde yenilendi.
- `sitemap.xml` 5 gerçek, indekslenebilir sayfa için kök dizine eklendi (404 hariç).
- Tüm HTML sayfalarına SEO canonical / Open Graph URL eklendi.
- Tüm sayfalardaki HTML içinde gömülü SVG favicon yerine Google'ın erişebileceği **kökten servis edilen** favicon.ico, favicon.svg ve 48×48 PNG bağlantıları eklendi.
- PWA/telefon uyumu için 192/512 PNG, apple-touch-icon ve site.webmanifest eklendi.
- Mevcut marka simgesindeki koyu-gri/turuncu A tasarımı korundu.
- Çakışan üç Pages iş akışından yalnızca **Anadolu Manitou - GitHub Pages** bırakıldı.
- `CNAME` eklendi; otomatik yayın betiği özel alan adını canonical/sitemap için esas alır ve ikonları yayına kopyalar.

## GitHub Pages (önerilen kurulum)

1. Bu ZIP dosyasını açın; **içindeki dosyaları** GitHub reposunun ana dizinine aktarın. `index.html`, `CNAME`, `robots.txt`, `sitemap.xml`, `favicon.ico`, `assets` ve `.github` aynı seviyede olmalı. `manitou_fixed_project` adlı fazladan bir iç klasör oluşmamalı.
2. Eski `.github/workflows/static.yml` ve `.github/workflows/jekyll-gh-pages.yml` dosyaları GitHub'da hâlâ varsa **silin**. Sadece `.github/workflows/pages.yml` kalsın.
3. Settings → Pages → Source: **GitHub Actions**. Custom domain: **anadolumanitou.site**.
4. GitHub → Actions → **Anadolu Manitou - GitHub Pages** → Run workflow. İşlem tamamlanınca yayın adresini kontrol edin.
5. Alan adının GitHub Pages'e yönlendiğinden, HTTPS'in açıldığından emin olun. DNS kayıtları ve Search Console site sahipliği ZIP'ten değiştirilemez.

Yayından sonra şunları açıp kontrol edin:

- https://anadolumanitou.site/robots.txt
- https://anadolumanitou.site/sitemap.xml
- https://anadolumanitou.site/favicon.ico
- https://anadolumanitou.site/favicon-48x48.png
- https://anadolumanitou.site/iletisim/

**Google Search Console:** https://search.google.com/search-console adresinde alan adını doğrulayın → Site Haritaları → `sitemap.xml` gönderin → URL denetimi ile ana sayfanın tekrar taranmasını isteyin. Google'da favicon görünmesi günler veya haftalar alabilir, garanti değildir.

## cPanel'e yükleyecekseniz

Ayrıca verilen **yayına hazır (statik) ZIP** içindeki dosyaları doğrudan `public_html` dizinine yükleyin. GitHub repo ZIP'i içindeki `scripts` ve `.github` klasörlerinin webde yayınlanmasına gerek yoktur.

## Google Ads site bağlantısı için gerçek URL'ler

- Manitou kiralama: https://anadolumanitou.site/malatya-manitou-kiralama/
- Telehandler kiralama: https://anadolumanitou.site/malatya-telehandler-kiralama/
- İletişim: https://anadolumanitou.site/iletisim/
- Teklif formu: https://anadolumanitou.site/#teklif
- Hizmet bölgesi: https://anadolumanitou.site/#hizmet-bolgesi

İlk üç link ayrı sayfalara yönlendirir. Aynı ana sayfadaki #... bağlantıları için Google Ads'in bağlantıların yeterince farklı olup olmadığını ayrıca değerlendirebileceğini unutmayın.

> Not: İletişim numaraları, site tasarımı, mevcut metinler ve tıklama davranışları değiştirilmedi.
