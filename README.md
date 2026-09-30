# Anadolu Manitou — GitHub Pages paketi

Bu pakette **index.html doğrudan ana klasördedir**. CSS, görsel, font ve menü bağlantıları göreli yollar kullanır. Site hem alan adının kökünde hem `kullanici.github.io/repo-adi/` adresinde açılabilir.

## Önerilen kurulum — otomatik SEO adresleriyle

1. ZIP'i bilgisayarınızda açın. ZIP dosyasının kendisini yüklemeyin.
2. Çıkan dosya ve klasörleri GitHub reposunun ana dizinine yükleyin. `index.html`, `assets`, `scripts` ve `.github` aynı seviyede olmalıdır. Dıştaki ZIP klasörünü veya yalnızca eski `dist` klasörünü yüklemeyin.
3. `.github/workflows/pages.yml` ve `.github/seo-data.json` dosyalarının GitHub'da göründüğünü kontrol edin. Gizli `.github` klasörü de yüklenmelidir.
4. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions** seçin.
5. **Actions → Anadolu Manitou - GitHub Pages → Run workflow** seçin. Varsayılan dalı kullanın.
6. İşlem yeşil olduğunda **Settings → Pages → Visit site** ile açın. Normal `github.com/kullanici/repo` bağlantısı sitenin kendisi değildir.

GitHub Pages özelliğinin repo/hesap planınızda açık olması gerekir. GitHub Free'de repo herkese açık olmalıdır. Mevcut başka bir siteyi içeriyorsa dosyaları rastgele silmeyin; bu paketi o sitenin üzerine yüklemek mevcut giriş sayfasını değiştirir.

Otomatik yayın GitHub'ın bildirdiği gerçek URL'yi alır; canonical, Open Graph URL, firma/hizmet şeması ve sitemap adreslerini buna göre oluşturur. Kullanıcı adı veya repo adı koda yazılmak zorunda değildir. GitHub'da özel alan adı tanımlanmışsa o adres kullanılır. Özel alan adı veya repo adı değişince workflow'u yeniden çalıştırın.

## Sadece sitenin açılması için basit alternatif

**Settings → Pages → Source: Deploy from a branch → Branch: main → Folder: /(root) → Save** seçilebilir. Dalınız `master` ise onu seçin. Bu durumda da `index.html` ana dizinde olmalıdır.

Bu basit yayın biçimi siteyi açar, fakat repo URL'si önceden bilinmediği için pakete yanlış canonical veya sitemap adresi konulmamıştır. Tam SEO adresleri için yukarıdaki GitHub Actions yöntemini kullanın veya gerçek yayın URL'sini paylaşın. Her iki yöntemi aynı anda yapılandırmayın.

## Dosyaları düzenlemek

- `index.html`: ana sayfa.
- `malatya-manitou-kiralama/index.html`: Manitou kiralama.
- `malatya-telehandler-kiralama/index.html`: telehandler kiralama.
- `iletisim/index.html`: iletişim.
- `gizlilik/index.html`: gizlilik açıklamaları.
- `assets/styles.css`: tasarım.
- `assets/app.js`: menü, WhatsApp talebi ve izinli ölçüm.
- `assets/site-config.js`: GA4 / Ads kimlikleri. Şu anda ölçüm kapalıdır.
- `.github/seo-data.json`: sayfalara ait yapılandırılmış veri. Firma veya hizmet bilgisi değiştiğinde görünür içerikle birlikte bu veriyi de güncelleyin.

## Kendi bilgisayarınızda çıktı oluşturmak

Python 3 ile, ek paket yüklemeden:

```sh
python3 scripts/configure-pages.py https://KULLANICI.github.io/REPO
```

Buradaki örnek yerine gerçek adresinizi kullanın. Yayına hazır dosyalar `_site` klasöründe oluşur. Dosyaları manuel kendi sunucunuza aktaracaksanız `_site` içeriğini web köküne yükleyin.

## Bilinen sınırlar

- Bu paket sizin GitHub hesabınıza otomatik yüklenmiş değildir. Repo bağlantısı ve Pages ayarları görülmeden mevcut hesabınızdaki hata doğrulanamaz.
- Search Console doğrulaması ve site haritası gönderimi ayrıca yapılmalıdır. Proje adreslerindeki `/repo/robots.txt` host kökündeki robots.txt yerine geçmez; site haritası Search Console'a tam URL ile gönderilebilir.
- Özel 404 sayfasındaki bağlantıların her derin URL'de çalışması otomatik yayın ile sağlanır. Basit dal yayını için gerçek URL ile çıktı üretmek gerekir.
- Telefon ve WhatsApp tıklaması gerçek arama, gönderilmiş mesaj veya satış anlamına gelmez. Ölçüm kimlikleri eklenince izin yönetimi devreye girer.
- Font lisansları `assets/licenses` içindedir. Bootstrap telif başlığı korunmuştur. Temsili makine fotoğrafı kullanıcı tarafından verilmiştir.

Resmi kurulum belgesi: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
