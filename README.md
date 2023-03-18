![Docker?](https://github.com/gkandemi/docker/blob/main/docs/images/1-docker.png)

Bu doküman [kablosuzkedi Youtube Kanalı](https://youtube.com/kablosuzkedii) için hazırlanmıştır. Bu içerikte bulunan konular ve daha fazlası için video serisine de göz atabilirsiniz.

[Docker Nedir Nasıl Kullanılır? | Part #1 | Image Nedir? Container Nedir? Docker Komutları
](https://www.youtube.com/watch?v=4XVfmGE1F_w)

[Docker Network Türleri | Dockerfile ile Image Nasıl Üretilir | Part #2
](https://www.youtube.com/watch?v=ZeYIp1PrWXc)

[Docker Compose ile Servis Yönetimi Part #3 | Twitter, Asana, Wordpress, MongoDB NodeJS Uygulamaları
](https://www.youtube.com/watch?v=cu3_ldKZ0os)

[Linux'a Docker Kurulumu | Production | Nginx | Reverse Proxy ile 2 Domain 1 Host Yönetimi | Part #4
](https://www.youtube.com/watch?v=JU5vvLNipXY)

### Klasik Senaryolar

**Klasik Yöntem ile**
Yazılımcılar geliştirmiş oldukları yazılımı Production ortamına almak için **DevOps** ekibiyle görüşür ve dosyaları iletir. Bu dosyalar yazılım ve environment'in nasıl ayarlanacağına ait bilgileri de içerir. Devops yazılımı kendisi yazmadığı için doğal olarak bunun sıkıntısını çok fazla yaşarlar ve uygulamayı başarılı bir şekilde aynı development ve test envlerinde olduğu gibi çalıştırmak için uğraşırlar.

**Docker ile**
Yazılımcılar bu uygulamalarını **Docker Image** haline getirip **DevOps** takımıyla paylaşırlar ve Devops'un yapacağı tek işlem bu image'i;

```
docker run imageName
```

ile **container** haline getirmek olacaktır. Bu da tamı tamına yazılımcının istediği envye sahip tüm ayarlar yapılmış halde uygulamanın çalışabileceği en iyi ortamı kurmak demektir.

## Neden Docker'a İhtiyacımız var?

![Neden Docker'a İhtiyacımız var?](https://github.com/gkandemi/docker/blob/main/docs/images/2-neden-ihtiyacimiz-var.png)

Tüm bu uygulamalar OS ile uyumlu olacak şekilde çalışır. Bizim bu uyumu OS sürümüne göre her bir servis için ayrı ayrı sağlamamız gerekir.

İşte burada problem ortaya çıkmaya başlıyor.

- Peki gerçekten bu uyum her bir servis için geçerli olabilir mi? Bazen mümkün bazen mümkün olmayabilir.
- Zamanla bu servisler güncellenir ya da servisler içerisinde kullanılan bağımlılıklar kullanmış olduğumuz servisler ile uyumlu olmayabilir.Tabi ki yapabileceğimiz en mantıklı çözüm bu servis için uygun bir işletim sistemini bulmak olacaktır. Peki bulacağımız uygun işletim sistemi diğer servisler için uyumlu olacak mıdır?
- Diğer problem ise bu bağımlılıkların birbirlerini etkilemesi.
- Uygulamanın çalışacağı ortamı, sürece dahil olan tüm ekibin sahip olması beklenemez (Development / Test / Production)

Doğal olarak bu şekilde uygulama geliştirmek bunları yönetmek ve sunucular arasında taşımak oldukça zor bir durumdur.

## Neye İhtiyacımız Var?

![Neye İhtiyacımız var?](https://github.com/gkandemi/docker/blob/main/docs/images/3-neye-ihtiyacimiz-var.png)

Tam olarak burada bu servisler arasında iletişimi en iyi şekilde yapacak ve birbirlerinden etkilenmeden bunu başarılı bir şekilde yönetebilecek bir araca ihtiyacımız oluyor.

Burada **Docker** devreye giriyor. Docker'ın yapmış olduğu işlem her bir servisi **aynı işletim sistemi üzerinde** kendilerine ait bir dünyada çalışmasını sağlayarak kendilerine ait kütüphaneleri ve bağımlılıkları olmasını sağlıyor.(Elbette çok daha fazlasını da bize sağlıyor fakat şimdilik burada kalalım :))

Böylece herhangi bir developer kendi uygulamasının çalışması için gereken Docker konfigürasyon dosyasını oluşturduktan sonra, bu servisin ayağa kalması/çalışması için `docker run` demesi yetiyor. Bu sadece geliştirici için değil bu sürece dahil olan herkes için geçerli oluyor. Tek komut aynı environment (ortam).

Docker bunu yaparken **container** yapısından yararlanıyor. Peki Container Nedir?

## Container Nedir?

![Container Nedir?](https://github.com/gkandemi/docker/blob/main/docs/images/4-container-nedir.png)

Container, kendilerine ait prosesleri, servisleri, networkleri bulunan tamamen izole edilmiş ortamlardır (environment). Tıpkı VM gibi fakat her bir VM kendisine ait bir OS barındırırken her bir Container OS kernel'i paylaşmaktadır.

## Ne Güzel Bir Teknoloji!

![Ne Güzel Bir Teknoloji?](https://github.com/gkandemi/docker/blob/main/docs/images/5-ne-guzel-bir-teknoloji.png)

Bu ifade size oldukça devrimsel ve Docker ile yeni ortaya atılmış bir fikir gibi gelebilir fakat tam olarak öyle değil :) Container yaklaşık 10 yıldan beri kullanılmaktadır. Container'ların bir çok türü bulunmaktadır. Linux tarafında bunlardan bazıları;

- LXC
- LXD
- LXCFS

docker Linux'de bu container türlerinden **LXC container** türünü kullanmaktadır. Windows'da ise bu iş için kullanılan adı **Windows Server Container Support***'dur. İşte bu container'ları yönetmek oldukça zor ve low level bir işlem olduğundan dolayı docker bize bu işleri kolaylaştırmak için high level birçok araç sunuyor. Böylece kullanıcılar container'ları istedikleri gibi kolaylıkla yönetebiliyor.

## Docker Nasıl Çalışıyor?

![Docker Nasıl Çalışıyor?](https://github.com/gkandemi/docker/blob/main/docs/images/6-docker-nasil-calisiyor.png)

Docker'ın nasıl çalıştığını anlamak istiyorsanız ilk olarak İşletim sisteminin nasıl çalıştığını biraz anlamanız gerekmektedir. Örnek vermek gerekirse Linux İşletim sistemini ele alalım.

Tüm Linux tabanlı işletim sistemlerine bakacak olursanız bu işleletim sistemleri temelde 2 farklı bileşeni içerisinde barındırır.

- OS Kernel
- Bir çok yazılım seti

OS Kernel donanim ile etikleşimden sorumludur. OS Kernel aynı kalır. Fakat üzerindeki yazılım setleri işletim sistemleri arasındaki farkları belirler. Bundan dolayı sürekli bir Linux dağıtımı gibi cümleler duyarsınız. Bu yazılım setleri bir çok farklılıklar içerebilir. Grafik arayüzleri, sürücüler, geliştiriciler için komut setleri ve çok daha fazlası.

Yukarıda söylediğim gibi Docker Container'ları ortak **OS Kernel** kullanır. Peki bu gerçekten ne anlama gelir?

![Docker Nasıl Çalışıyor?](https://github.com/gkandemi/docker/blob/main/docs/images/7-docker-nasil-calisiyor.png)

Diyelim ki siz Linux üzerine Docker yüklediniz. Docker aynı kernele sahip herhangi bir linux sürümünü container olarak çalıştırabilir. Bu durumda kernel ortak olarak paylaşıldığında yazılım seti container içerisinde kullandığımız linux sürümünden gelir.

![Docker Nasıl Çalışıyor?](https://github.com/gkandemi/docker/blob/main/docs/images/8-docker-nasil-calisiyor.png)

Eğer siz Linux OS üzerine yüklemiş olduğunuz bir Docker ile Windows işletim sistemine sahip bir contianer çalıştırmak isterseniz bunu yapamazsınız. Çünkü container'ların ortak bir kernel paylaştığını söylemiştik. Doğal olarak Linux Kerneli ile Windows'un kerneli farklı olduğu için bu container'ı çalıştıramazsınız.

O zaman Windows üzerine Docker yükleyebilirim ve Docker üzerinden Windows base container'lar çalıştırabilirim diye düşünebilirsiniz. Fakat bu da mümkün değil.

![Docker Nasıl Çalışıyor?](https://github.com/gkandemi/docker/blob/main/docs/images/9-docker-nasil-calisiyor.png)

Buradaki durum sizi aldatmasın çünkü windows işletim sistemine Docker yükleyebiliyorsunuz ve linux base bir container çalıştırmış da olabilirsiniz fakat burada çok önemli bir nokta Docker Host tarafından bizim bilmemize ihtiyacımız olmadan yapılıyor.

Siz Windows üzerine docker yüklediğinizde Docker kendisi Linux bir VM üzerinden tüm yönetimini yapmaktadır. Doğal olarak siz yine Linux üzerinde Docker host çalıştırmış oluyorsunuz. Doğal olarak ortak kernel paylaşımı yine linux üzerinden olmaktadır. Bundan dolayı Windows işletim sistemi üzerinden yönettiğiniz docker host ile yine windows base bir container çalıştıramazsınız.

![Docker Nasıl Çalışıyor?](https://github.com/gkandemi/docker/blob/main/docs/images/10-docker-nasil-calisiyor.png)

Bunu yapabilmek için Windows Server üzerine kurmuş olduğunuz Docker üzerinden windows base bir container çalıştırabilirsiniz.

![Docker Window Üzerinde Nasıl Çalışıyor?](https://github.com/gkandemi/docker/blob/main/docs/images/12-docker-windows-uzerinde-nasil-calisiyor.png)

## VM vs Container

![VM vs Docker](https://github.com/gkandemi/docker/blob/main/docs/images/13-vm-vs-container-utilization.png)

- VM Hypervisor üzerinde her bir VM container'ını yönetir. Fakat bu her bir VM kendine **ait bir işletim sistemine sahiptir.**

- Docker container'ları ise sadece bizim application dosyalarımız, kütüphaneler ve bağımlılıkları içerir. Sadece tek bir işletim sistemi olduğu için bu **utilization** adına oldukça performanslı bir çözümdür.

- VM içerisinde İşletim sistemi barındırdığı için doğal olarak Docker'a göre daha fazla alan kaplar.
- Uygulamayı ayağa kaldırmak istediğinizde VM OS içerdiğinden ilk olarak OS'in açılmasını beklemek gerekir. Docker'da ise direk uygulamanın gereksinimleri doğrultusunda ayağa kalkar. Yani çok daha hızlı boot süresine sahiptir.
- Sanal Makineler kendilerine ait OS'e sahip olduğu için ve bunlar arasındaki iletişim **Hypervisor** tarafından yapıldığı için doğal olarak bir sunucu üzerinde farklı işletim sistemlerine sahip VM'ler üretebilirsiniz. Fakat docker aynı OS üzerinde çalışan yapılar olduğu için bu mümkün değildir.

İkisinin de kendisine göre avantaj ve dezavantajları bulunmaktadır. Fakat genel olarak Docker bu konuda bayağı bir önde.

Aynı zamanda bu iki teknolojiyi beraber kullanarak da oldukça güçlü alt yapılar inşaa edebiliriz. 1 hypervisor üzerinden farklı VM'ler ve onların içerisinde Docker üzerinden yönetilen container'lar şeklinde.

## Nasıl Yapılır?

Nasıl yapılacağını öğrenmek için ilk olarak Image konusunun ne olduğunu bir açıklağa kavuşturmamız gerekiyor.

#### Image Nedir?

- İçerisinde bir çok farklı yapıyı barındıran yapılardır. (OS, Application, ve daha fazlası)
- Template, plan, package
- Akılda kalması için;
  - Form tabanlı uygulamaların (WinForms vs) projesi image olarak düşünülebilir
  - Eskilere gidecek olursak Ahead Nero ile ne image’ler ürettik :)
- Peki bu image’ler nerede?
- Docker Hub (Docker’un public ve private olarak bize sunduğu resmî repository hesabı)

#### Container Nedir?

- Image’i çalıştırdığımızda elde ettiğimiz proses olarak düşünülebilir
- Akılda kalması için;
  - Form tabanlı uygulamanın, çalıştırılmış hali olarak düşünülebilir
    - Proje > exe

Docker'ı bilgisayarımıza kurduk. Peki Docker ile container'ları nasıl kullanacağız? Bunun için ilk olarak ihtiyacımız container'ımızın **base** yani **temelini** oluşturacak bir image elde etmek. Peki bu image'ı nereden alacağız?

![Docker HUB](https://github.com/gkandemi/docker/blob/main/docs/images/16-docker-hub.png)

Bir çok şirket kendisine ait bir çok uygulamayı containerized edip **DockerHub** üzerinden bunu public ya da private olarak sunuyor. Siz bunlardan birini kullanmak istediğinizde bunun sadece

```
docker run imageName
```

şeklinde yazarak kendi ortamınıza bir kopyasını (instance) alabiliyorsunuz. Mesela;

```

docker run nodejs
docker run redis
docker mongodb
```

gibi.. farklı farklı instance'ları kendi ortamınıza rahatlıkla çekebilirsiniz.

## Container vs Image

![Container vs Image](https://github.com/gkandemi/docker/blob/main/docs/images/17-container-vs-image.png)

**Docker Image** sizin projeniz gibi düşünebilirsiniz. Projelerinizin dosyaları tüm ayarlar yani bir paket, template, plan gibi.

**Docker Container** ise bu template'in çalıştırılmış hali bir instance'ı gibi. Bir Docker Image'den birden fazla Docker Container çalıştırabilirsiniz.

Ayrıca siz de kendinize ait **image** dosyalarınızı üretebilir ve bunu Docker Hub Repository'e gönderebilirsiniz. Böylece Public ya da Private olarak diğer geliştiriciler bundan yararlanabilirler.

## Docker Sürümleri

- **Comminity Edition**
  - Ücretsiz sürüm ve belirli ücretsiz yönetim sistemleri mevcut. Community edition linux, mac, windows, cloud olarak erişebiliyor. Eğer Mac ve Windows sahibiyseniz bunun için **Docker Desktop** yüklemeniz ya da Virtualization özelliği bulunan Linux VM yüklemeniz gerekebilir.
- **Enterprise Edition**
  - Ücretli

## Docker Komutları

```
docker run
```

**run** komutu bir image'ı çalıştırmayı sağlar. Örneğin;

```
docker run node
```

dediğimizde node isimli **container** eğer bizim docker host'umuzda **varsa** çalıştırılır. Eğer yoksa **Docker Hub Repository** üzerinden bulunur indirilir ve çalıştırılır. Bir sonraki **docker run node** komutuyla beraber **docker host** üzerinden çalışmaya başlar.

```
docker ps
```

**ps** komutu çalışan tüm containerların listesini bilgileriyle beraber döker.

![Docker ps command](https://github.com/gkandemi/docker/blob/main/docs/images/docker_ps_command.png)

her bir container random **isim ve id** bilgisi alır. Eğer çalışan ya da çalışmayan tüm container'ların listesini görmek istersek. Bu durumda **-a** parametresini göndermemiz gerekir.

```
docker ps -a
```

![Docker ps -a command](https://github.com/gkandemi/docker/blob/main/docs/images/docker_ps-a_command.png)

aynı işlemi

```
docker container ls
```

```
docker container ls -a
```

ile de görebiliriz.

bu bize çalışan ve daha önce çalışmış ama durmuş tüm container'ların listesini verecektir.

```
docker stop containerName|containerID
```

çalışan bir container'ı durdurmak için kullanılır **containerName** ya da **containerID** bilgisini vermemiz yeterlidir.

Eğer çalışmayan docker container'larının boşuna yer kaplamasını istemiyorsak;

```
docker rm containerName|containerID
```

kullanabiliriz. Bu durumda sildiğimiz container'ları **docker ps -a** yaptığımızda listede görmeyeceğiz!

Aktif ve pasif olan tüm container'ları silmek için

```
docker container rm $(docker container ls -aq)
```

komutunu kullanabiliriz.

Peki indirdiğimiz ama kullanmadığımız **image** listesini nasıl görebiliriz? ya da **image listesini** nasıl görebiliriz?

```
docker images
```

bize docker hosts üzerinde bulunan tüm image listesini detayları ile getirir.

![Docker images Command](https://github.com/gkandemi/docker/blob/main/docs/images/docker_images.png)

peki bu image listesinden bir image silmek istersek ne yapabiliriz?

```
docker rmi imageName|imageID
```

image'i silecektir.

**Önemli Not**
Bir image'i silmek için, bu image'i kullanan herhangi bir container olmaması gerekir. Bundan dolayı ilk olarak bu image'e bağlı tüm container'ları silip sonrasında bu komutu çalıştırmalısınız.

![Docker rmi command](https://github.com/gkandemi/docker/blob/main/docs/images/docker_rmi_command.png)

Daha önceden **docker run nginx** ile beraber image'i bilgisayarımıza indirmiş ve bu sırada **ubuntu** image'ini yüklemesini beklemiştik. Tabi ki indirme ve çalıştırma esnasında bir bekleme süresi geçti. Bunu yapmak istemiyorsak? Yani sadece image'i indirip bırakmak istiyorsak bu durumda.

```
docker pull imageName (nginx)
```

diyebiliriz. Bu durumda sadece indirip bırakır. Image'i çalıştırmaz!

### Attach and Detach

Normalde bir bir docker image run ettiğimizde bu container ile ilgili bilgileri ya da Logları ekrana basabilir. Burada container'ın gereksinimlerinden dolayı çalıştırdığımız terminal üzerinde bir çok loga rastlayabiliriz. Bu modun adına **attach mode** denilir.
İstersek bunu arkaplanda yapabiliriz. Yani bir uygulamayı arkaplanda çalışmasını sağlayabilir ve bu bizim terminal üzerinde herhangi bir log görmemize engel olur bu modun adına da **detach mode** denilir. Bunu yapmak için;

```
docker run -d imageName
```

bu bize ayağa kaldırdığı container'in ID bilgisini verecektir.

![Attach Detach](https://github.com/gkandemi/docker/blob/main/docs/images/docker_attach_detach_mode_command.png)
![Attach Detach](https://github.com/gkandemi/docker/blob/main/docs/images/docker_attach_detach_mode_command_2.png)

Eğer **detach** yapılmış bir container'ı **attach** moda geri sokmak istersek bunu için **attach** komutunu kullanabilirz.

```
docker attach containerID
```

**Not:**

docker komutu ile tanımladığınız herhangi bir komutta eğer **ID** bilgisine ihtiyaç duyuyorsanız bu ID bilgisinin ilk bir kaç karakterini tanımlamanız yeterli. Yukarıdaki örnek üzerinden gidecek olursak;

```
docker attach a043d
```

yazdığımızda bu bizim için **detach** moda sokulan container'ın ID bilgisine eşittir.

```
docker run -d --name webapp nginx:1.14-alpine
```

## Docker Run Komutu
### run -tag
Bir image pull ettiğimizde bu image belirli bir sürüme sahip olur. Bu sürümün adına **tag** denilir. Son sürüm indirildiğinde bu tag **latest** olacaktır.

![Docker Tag](https://github.com/gkandemi/docker/blob/main/docs/images/docker_tag.png)
![Docker Tag](https://github.com/gkandemi/docker/blob/main/docs/images/docker_tag_2.png)

### run -stdin (-it/interactive terminal)

Örneğin terminal üzerinde kullanıcıdan bir bilgi alan uygulamanız var ve bu uygulamayı dockerize ettiniz. Bu uygulamanın image adı **testApp** olsun;

```
docker run testApp
```

dediğinizde, çalışan uygulama sizden herhangi bir bilgi almadan sonlanacaktır. Çünkü Docker prompt default olarak kullanıcıdan bilgi almamaya programlıdır. Fakat bunu değiştirebiliriz.

```
docker run -i testApp
```

**-it** argümanını göndererek run ettiğiniz image'de bir user prompt varsa buna izin verir. **-i = interactive terminal** demektir.

![Docker run it](https://github.com/gkandemi/docker/blob/main/docs/images/docker_run_it.png)

### run -port mapping

Bir container ayaga kaldırdığımızda bu image bir porta sahip olur. Biz bu ayağa kaldırdığımız uygulamaya yani container'a dışarıdan erişmek istediğimizde bu portu kullanarak **erişemeyiz**. Bunun yerine **port mapping** yapmalıyız. Bunu yapmak oldukça basit.

```
docker run -p DIS_PORT:IC_PORT imageName
```

şeklinde düşünülebilir. yani

```
docker run -p 80:5000 webApp
```

şeklinde bir komut ile çalıştırdığımızda artık biz uygulamamıza (yani docker host/engine üzerindeki container'a) **80** portu üzerinden erişebiliriz. Fakat Docker Engine/Host içerisinde uygulamamız çalışırken **5000** üzerinden çalışmaya devam edecektir. Böylece portları maplemiş oluyoruz.

![Port Mapping](https://github.com/gkandemi/docker/blob/main/docs/images/22-port-mapping.png)

![Port Mapping](https://github.com/gkandemi/docker/blob/main/docs/images/docker_port_mapping_1.png)

![Port Mapping](https://github.com/gkandemi/docker/blob/main/docs/images/docker_port_mapping_2.png)

### run -volume mapping

Docker container içerisinde veriler herhangi bir şekilde kalıcı olamaz. Bundan dolayı dockerize ettiğiniz uygulamanız dosya sistemi üzerinde eğer veri saklamaya ihtiyaç duyuyorsa ya da container içerisinde veri tabanı barındıran bir sistem de olabilir (mysql, mongodb vs.). Bu durumda volume kullanarak persistency sağlıyoruz yani kalıcılık. Bunun için **container dışında** bir location seçerek **run** komutu ile beraber **volume mapping** yapıyoruz.

Bunu yapabilmek için;

```
docker run -v /opt/datadir:/var/lib/mysql mysql
```

dediğimizde **mySQL**'in kayıtları sakladığı dizin olan **/var/lib/mysql**'deki verileri docker host içerisinde **/opt/datadir** klasöründe tutacaktır. Bu **/opt/datadir** klasörü docker host/engine tarafından izin verilen klasörlerden olmalıdır. Verilen data klasörü Container **silinse bile bilgiler docker engine üzerinde kalmaya devam eder**.

![Volume Mapping](https://github.com/gkandemi/docker/blob/main/docs/images/19-docker-volume.png)

![File Sharing](https://github.com/gkandemi/docker/blob/main/docs/images/docker_file_sharing.png)

### inspect

Docker ps komutu contariner'lar hakkinda birçok bilgiyi bizimle paylaşır. Fakat daha fazla bilgiye ihtiyaciniz olursa **inspect** komutu bu bilgileri bize sağlar.

```
docker inspect containerName
```

### Container logs
Özellikle -d **dettach** mod ile çalışan bir container'a ait logları görmek için logs komutunu kullanabilirsiniz.

```
docker logs containerName
```

### Image Tag

Bir image'e tag vermek istiyorsak bu oldukça kolay.

```
docker image tag imageID/imageName tagName
```

### Docker Images
Kendimize ait bir docker image yaratmak istersek bunu yapabildiğimiz yollardan bir tanesi **Dockerfile** oluşturmak. Dockerfile docker tarafından bilinen image yaratırken bizim image'imizin içerisinde bulunmasını istediğimiz tüm yapıları barındıran bir dosyadır.

Genel olarak Dockerfile içerisinde yazdığımız komuların yapısı şu şekildedir.

```
KOMUT ARGUMAN
```

**KOMUT** docker tarafından bilinen Komut setlerinden bir tanesi olmalıdır. **ARGUMAN** ise, **KOMUT** un yapacağı işlevi belirtir. Örnek olarak bir Docker file dosyasına bakalım.

```
FROM ubuntu:18.04
RUN apt-get update
# RUN DEBIAN_FRONTEND="noninteractive" apt-get -y install tzdata
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install nodejs -y

COPY . /opt/node-server/
WORKDIR /opt/node-server
RUN npm install
CMD ["node", "app.js"]
```

Bu dosyadaki komutlardan **FROM, RUN, COPY, WORKDIR, CMD** komutları docker engine'ine ne yapması gerektiğini söyler. Buradaki en önemli durum ise **Her Dockerfile bir FROM** komutu ile başlamalıdır.

**FROM** komutu o image'in hangi Image üzerinden Base alınacağını söyler. Yani Her bir image başka bir BaseImage üzerinden türetilir. Örneğimizdeki image ise **ubuntu** image'inin **18.04** isimli tag'i üzerinden türetilmiştir.

### Build Image (Bir image'i oluşturmak)

Dockerfile üzerinden bir image üretmek için;

```
docker build Dockerfile
```

ya da aynı dizindeysek

```
docker build .
```

komutu kullanılabilir. Docker Engine hemen Dockerfile üzerindeki direktifleri yapmaya başlayacaktır. Bu sırada Dockerfile içerisindeki her bir satır ayrı ayrı işleme tâbi tutulur. Bu yapının adına **Layered** denilir.

#### Layered Structure

Dockerfile üzerindeki her bir satır Docker Host üzerinde Layer by layer çalışmaktadır. Yani

**Layer 1**

```
FROM ubuntu:18.04
```

**Layer 2**

```
RUN apt-get update
```

**Layer 3**

```
RUN apt-get install curl -y
```

**Layer 4**

```
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
```

**Layer 5**

```
RUN apt-get install nodejs -y
```

**Layer 6**

```
COPY . /opt/node-server/
```

**Layer 7**

```
WORKDIR /opt/node-server
```

**Layer 8**

```
RUN npm install
```

**Layer 9**

```
CMD ["node", "app.js"]
```

şeklinde 9 katmandan oluşan yapı şeklinde oluşturulur. Eğer herhangi bir step üzerinde hata alırsak, bundan önceki Layer'lar otomatik olarak geçilip hatanın bulunduğu Step üzerinden build işlemine devam edecektir.

Eğer buradaki Layer'lardan herhangi birine sahip başka bir image daha build edecek olursak Docker Engine o layer'ı build etmez onun yerine build edilmiş olanı tekrardan kullanır.

### Build Image With Tag Name (Bir image'e build anında isim vermek)
Eğer bir image'e build edilirken bir isim (tag) vermek istiyorsak **-t** opsiyonu kullanılabilir. Tam olarak kullanımı ise şu şekilde.

```
docker build . -t tagName
```

#### Peki Dockerfile içerisindeki yapıları neye göre oluşturuyoruz?

Bu aslında tahmininizden çok kolay. Eğer docker komut setini aklınızda tutamıyorsanız ya da tam olarak nerede ne yapacağınızı bilmiyorsanız bunu herhangi OS üzerinde nasıl adım adım yapıyorsunuz ilk olarak onu düşünün. Daha sonrasında yaptığınız tüm adımları bir kenara not alın ve başlarına Docker Komut setlerini yerleştirin.

- Mesela sizin uygulamanız nerede çalışacak?
  - Ubuntu üzerinde
  - İlk başta İşletim sisteminin update edilmesi gerekir
    - `apt-get update` komutu çalıştırılır
  - Ardından Node.js'i indirmek için Curl'e ihtiyacımız olur
    - `apt-get install curl -y`
  - Sonrasında curl vasıtasıyla Node.js indirilir
    - `curl -sL https://deb.nodesource.com/setup_10.x | bash`
  - Node.js Yüklenir
    - `apt-get install nodejs -y`
  - Kaynak dosyalarınızı bir klasör altında oluşturursunuz veya buraya kopyalarsınız
  - Bağımlılıkları yüklersiniz
  - Uygulamayı çalıştırırsınız

İşte bunlar sizin kendi projenizi çalıştırmak için izlediğiniz bir yol. Bunu Docker'ın da yapabilmesi için bu adımları docker'a söylemeniz gerekir. Buradaki en önemli işlem burada işletim sisteminin yaptığı işleri **RUN** komutuyla yaptırmanız ve sizin manuel olarak yaptığınız işlemleri ise diğer komutlarla yapmanız. Mesela `apt-get update` işlemi işletim sistemi bazında olacak olan bir durum. Bunun için buna `RUN apt-get update` diyoruz. Fakat klasörlerinizin oluşturulması veya bir yerden dosyalarınızın kopyalanması ise sizin manuel olarak yaptığınız işlemler. Bundan dolayı bunu **COPY** komutuyla yapıyoruz. **WORKDIR** ile altındaki satırların çalışacağı klasörü belirterek yine **RUN** ile bağımlılıkları yüklüyoruz. Son olarak da uygulamanın **image oluşturulduktan sonra** container olarak ayağa kaldırılması durumunda çalıştırılacak komutu belirtiyoruz. Yani sizin uygulamanızın çalışması için gereken komut neyse onu belirtiyoruz. Bu da **CMD** komutu ile yapılabilir.

### Environment Variables (Ortam Değişkenleri)

Bir çok uygulama deploy edildiği yerde bulunan environment değişkenlerine göre uygulamada belirli başlı aksiyonları almaktadır. Elbette sizin uygulamanızın da kendisine has belirli başlı dışarıdan alabileceği environment değişkenlerine ihtiyacı olabilir. Bunu bir kaç şekilde Docker ile yapabiliyoruz.

- Container'ı ayağa kaldırma esnasında
- Dockerfile içerisinde image içinde

#### Container Zamanında

Bu işlem için `-e DEGISKEN=DEGER` şeklinde tanımlama yapabiliyoruz. Burada istediğimiz kadar parametre gönderebiliriz.

```
docker run -r CHANNEL_NAME=kablosuzkedi
```

çalışan bir container'ın sahip olduğu ENV değişkenlerinin bilgilerine ulaşmak için;

```
docker inspect containerName
```

yapıldıktan sonra **Config > Env** altında bulunabilir.

#### DOCKER --link

Çalışan 2 container'ı birbirine bağlamak için bu iki container'ı birbirine linkleyebiliriz. Bunun için bağlanılmak istenen container'ın çalıştırılırken name almış olması gerekir.

Bunu iki farklı örnek ile açıklayalım. Bir MySQL ayağa kaldırdığımız bir container'ımız var. Aynı şekilde MySQL'e erişebilecek bir arayüz olan **phpMyAdmin olsun**. Bu iki container arasında bağlantı kurmamız gerekiyor ki phpMyAdmin MySQL'e bağlanabilsin. Bunun için;

```
docker run --name mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=test123456 mysql
```

```
docker run --name mysql-server -p 3306:3306 -v /opt/data:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=test123 mysql
```

```
docker run --name padmin -p 8000:80 --link mysql-server:db phpmyadmin/phpmyadmin
```

Diğer bir örneğimiz ise kendi yaptığımız bir proje üzerinden olsun;

Bir TODO App'imiz var. NodeJS ile MongoDB arasında bir bağlantı kurmamız gerekiyor. Burada NodeJS ile MongoDB'ye bağlantı kurduğumuz için MongoDB için ayağa kaldırdığımız container'ın **name** almış olması gerekiyor.

```
docker run --name mongo-container mongo
```

daha sonra ayağa kalkmış **mongo-container** isimli container'a NodeJS içerisinden bağlanmak için **link** yapıyoruz.

**Not:** NodeJS için kullanacağımız ImageName **todo-app** olsun.

```
docker run -p 3001:3001 --link baglanilacakContainerName:kodIcerisindeKullanilacakAlias todo-app
```

şeklinde yapilmalidir. Peki burada açıklamamız gereken 2 farkli nokta var.

**baglanilacakContainerName :** Adından da anlaşılabileceği gibi bağlanmak istediğimiz container'ın adını belirttiğimiz bölüm. Bizim durumumuz için bu **mongo-container** olmalıdır.

**kodIcerisindeKullanilacakAlias :** Bu bölüm biraz çetrefilli işte :) Mongoose ile mongoDB'ye bağlanmak için yazdığımız komut aşağıdaki gibidir;

```
 await Mongoose.connect("mongodb://127.0.0.1:27017/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
```

Fakat container'lar çalıştığında 127.0.0.1 üzerinden çalışmıyor. Docker Host içerisinde çalışıyorlar. Bu container'ları birbirlerine bağlamak için burada `--link` argümanını kullandık. Bundan dolayı da bu bağlantı cümlesi değiştirilmelidir.

Peki nasıl?

yukarıda mongodb için `--link baglanilacakContainerName:kodIcerisindeKullanilacakAlias` tanımını yapmıştık. Buradaki **kodIcerisindeKullanilacakAlias** bizim tamı tamına mongoDB'ye kod üzerinden bağlantıyı yaptığımız yerdeki değişikliği belirtiyor.

```
 await Mongoose.connect("mongodb://kodIcerisindeKullanilacakAlias:27017/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
```

### CMD ile ENTRYPOINT arasındaki farklar

**CMD** ile **ENTRYPOINT** temelde aynı komutlar yani Container ayağa kalktığı anda çalıştırılacak komutları belirlerler. Fakat ikisi arasındaki temel fark şudur. Ubuntuyu şu şeklide çalıştırdığınızı farzedelim.

```
docker run ubuntu
```

ubuntu image'inin içerisinde bulunan **CMD** komutundan dolayı burada container ayağa kalkar ve direk kapanır. Çünkü çalışabilecek bir prosesi bulunmamaktadır. Fakat;

```
docker run ubuntu sleep 2
```

gibi bir komut verdiğinizde bu arkadaş 2 saniye bekler. Peki neden? Eğer DockerHub üzerinden ubuntunun image'ine giderseniz orada `CMD ["/bin/bash"]` yazdığını göreceksiniz.`docker run imageName` ifadesinden sonra yazdığımız bir argüman bizim Image içerisinde kullandığımız CMD komutunu overwrite eder. Yani `docker run imageName [CMD]`olarak düşünebilirsiniz bunu.

Burada CMD komutun içeriğini komple değiştirir yani. Fakat siz parametreyi bizim durumumuzda `sleep 2` yani **2** değerini çalışma anında göndermek istiyorsanız işte işler burada değişiyor.

Bunun için **ENTRYPOINT** kullanabilirsiniz. ENTRYPOINT'in yapmış olduğu işlem; container ayağa kalktığında kendi içerisinde tanımlanmış olan executable bir uygulamaya sizin gönderdiğiniz parametreyi eklemek. Yani;

Image içerisinde şöyle bir yapımız olsun;

```
FROM ubuntu
ENTRYPOINT ["sleep"]
```

bu image'den bir instance alarak container ayağa kaldırmak istediğinizde;

```
docker run imageName 10
```

ifadesi gibi bir ifade ile çalıştırırsınız. Bu durumda ENTRYPOINT **10** argümanını alır ve `sleep` in sonuna ekler yani `sleep 10` olur.

Temel olarak farkı budur. **CMD** komple değiştirilir, **ENTRYPOINT** ekleme yapar.

#### CMD ve ENTRYPOINT Yazım Şekilleri

```
CMD ["executable", "param1", "param2", "param3"]
```

şeklinde JSON formunda bunu yazabildiğiniz gibi **shell** formunda da yazabilirsiniz.

```
CMD executable param1 param2 param3 param4
```

Aynı yapı **ENTRYPOINT** için de geçerlidir.

```
ENTRYPOINT ["executable"]
```

şeklinde JSON formunda bunu yazabildiğiniz gibi **shell** formunda da yazabilirsiniz.

```
ENTRYPOINT executable
```

#### DOCKER COMPOSE

Ya sizin birden fazla servisiniz ve bunlarda kullandığınız birden farkli veritabanı, izleme araçları, cache servisi varsa? Bunlar sizin uygulamanız içerisinde aktif olarak kullanılıyorsa her defasında uygulamayı çalıştırmadan önce sürekli sürekli bu link işlemini mi yapmalıyız? Buna cevabımız **HAYIR** Diğer bir durum ise bu uygulamanızda kullanılan servislerin uygulamanızdan önce çalıştırılmış olmasıdır ki Uygulamanız başarılı bir şekilde bağlanabilsin.

Bunun yerine servislerimizi detaylı bir şekilde tanımlayabildiğimiz mesela;

- Kullanacağı image ya da Dockerfile
- Port numaraları
- Volume Mapping
- Bağlı olduğu servisler

ve çok daha fazlasını yapabildiğimiz bir yapıdır **docker compose**.

Docker compose bizim image'lerimizi üretmemize ve bu image'lerin container'lara dönüşmesine yardımcı olan bunları tamı tamına bizim istediğimiz sıra ile yapan yardımcı bir araçtır.

Peki bunu nasıl yapıyoruz. Bunun için en önemli nokta; nasıl kendimize ait bir image oluştururuken **Dockerfile** isimli bir özel dosyadan yararlanıyorsak. Burada da yine docker için bir anlam ifade eden **docker-compose.yml** isimli **YML** dosyasından yararlanacağız. Örnek bir **YML** file üzerinden incelememize devam edelim.

```
version: "3.4"
services:
  webapp:
    build: .
    ports:
      - 3001:3001
    depends_on:
      - mongodb
  mongodb:
    image: mongo:latest
    ports:
      - 27018:27018
    volumes:
      - data:/data/db
volumes:
  data:

```

peki bunlar nedir? Hemen açıklayalım.

- **services** Bizim componentlerimizi servislerimizi belirtir. Mesela webapp, mongodb, redis vs vs.. --link ile yapmış olduğumuz bağlantıdaki gibi named container isimleri olarak düşünebilirsiniz.
  - **build** Eğer custom bir image'e sahipseniz yani kendi kaynak kodunuzla bir image üretiyorsanız bunun için hazırlamış olduğunuz **Dockerfile** dosyasını kaynak olarak gösterebilirsiniz. Burada **docker-compose.yml** ile **Dockerfile** aynı yerde olduğu için "**.**" kullandık.
  - **ports** Bir container'ı ayağa kaldırırken kullandığımız `-p` flag' inden farklı bir şey değildir.
  - **volumes** eğer bu container içerisindeki bilgiler bir volume üzerine tutulacaksa bunu **volumes** altında tanımlıyoruz.
  - **depends_on** ise bizim için oldukça heyecan verici diğer bir özellik. Birbirleriyle bağlantıyı aslında tam olarak burada yapıyoruz diyebilirim. **depends_on** içerisinde tanımladığımız isimler aslında bu **yml** file içerisindeki **diğer servis isimleri**. Docker bunu gördüğünde **depends_on** içindeki servisler tamamen ayağa kalkmadan önce kesinlikle ilgili servisi çalıştırmaz. Yani bizim örneğimizden yola çıkacak olursak. **mongodb** servisi ayağa kalkmadan önce **webapp** çalıştırılmaz.
  - **image** Eğer dockerHub üzerinden bir image çekiyorsanız onu burada belirtmelisiniz. Aslında Container'ın **BASE IMAGE** olarak kullanacağı image'i belirtir. Yani Dockerfile üzerindeki **FROM** komutuna denk gelir.
- **volumes** Servisler içerisinde belirtmiş olduğumuz **volumes** tanımlamalarını burada da yazmamız gerekiyor.

##### Peki bu dosyayı ürettikten sonra nasıl uygulamayı çalıştıracağız?

Bu oldukça kolay. **docker-compose.yml** dosyasının bulunduğu dizine giderek;

```
docker-compose up
```

dememiz yeterlidir. Bu bizim için içerisinde bulunan image tanımlarını bir bundle olarak yapar ve container'ı ayağa kaldıracaktır.

![Docker Compose Up](https://github.com/gkandemi/docker/blob/main/docs/images/docker-compose.png)

#### Docker Networks

Docker varsayılan olarak gelen 3 farklı network türü vardır.

- Bridge
- None
- Host

Hepsinin birbirinden farklı özellikleri vardır.

##### Bridge Network

Docker host içerisinde birbirlerinden bağımsız IP'lerde çalışan farklı farklı container'ları belirtir. Bu container'lar kendi aralarında iletişim kurabilirler.

```
docker run --network=bridge mongo
```

##### None Network

Docker host içerisinde herhangi bir şekilde bağlantı kurulamayan izole edilmiş container'lar için kullanılan network türüdür.

```
docker run --network=none mongo
```

##### Host Network

Docker host üzerinde yapabileceğimiz işlemler için kullanılan network türüdür.

```
docker run --network=host mongo
```

![Docker Network Types](https://github.com/gkandemi/docker/blob/main/docs/images/25-docker-network-turleri.png)

Peki biz 2 container sadece bir network üzerinde diğer 2 container'da farklı bir network üzerinde çalışmasını isteseydik(yani birbirlerinden izole etmek isteseydik) nasıl bir network türü oluşturacaktık?

##### Kullanıcı Tanımlı Networks

```
docker network create --driver bridge --subnet 182.18.0.1/24 --gateway 182.18.0.1 wp-mysql-network
```

![Docker User Defined Network Types](https://github.com/gkandemi/docker/blob/main/docs/images/25-docker-network-turleri-2.png)

```
docker network ls
```

komutunu kullanarak, kullanılan tüm network'lerin listesini görebilirsiniz.

Bir network ile ilgili detayları öğrenmek istiyorsanız

```
docker network inspect bridge
```

komutunu kullanabilirsiniz.

Herhangi bir container'in kullanmış olduğu networke ait detayları görmek istersek

```
docker inspect containerName
```

komutu ile bunu rahatlıkla yapabiliriz.

#### Container > Container arası iletişim

Eğer bir container'da bulunan uygulamanız diğer bir container içerisinde çalışan bir MySQL, MongoDB vs gibi herhangi bir uygulamaya erişmek isterse örneğin mysql bağlantısı için;

```
mysql.connect(172.18.0.3)
```

şeklinde IP adresi üzerinden bağlanabiliriz fakat bu doğru bir yol değildir. Çünkü Docker host yeniden başlatıldığında Docker host bu IP adresinin hala **mysql** isimli image'e ait olup olamayacağının **garantisini veremez**.

Bunun yerine yapılacak en iyi çözüm **containerName** ile bağlanmaktır.

```
mysql.connect(mysql-db)
```

şeklinde bağlantı yaptığımızda container, diğer container içerisinde bulunan mysql instance'ına erişebilecektir.

### ÖRNEK

```
docker network create --driver bridge --subnet 182.18.0.1/24 --gateway 182.18.0.1 wp-mysql-network
```

```
docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=db_pass123 --network=wp-mysql-network mysql:5.6
```

```
docker run --name webapp -e DB_Host=mysql-db --network=wp-mysql-network kodekloud/simple-webapp-mysql
```

### ÖRNEK 2 node-mongo-todo-app

```
docker network create todo-app-network
```

```
docker run --name mongodb --net todo-app-network -d mongo
```

```
docker run --name todo-app -p 3001:3001 --net todo-app-network node-mongo-todo-app
```

Aynı Network içerisinde bulunan bu iki uygulamayi birbirine bağlamak için "IP" adresi üzerinden değil container name üzerinden ilerliyoruz. Buna göre MongoDB ye bağlanmak için.

```
mongodb:27017/todos
```

dememiz yeterlidir.

### Bir image'i Docker Hub'a göndermek

Elimizde bir image var diyelim. Bunu public olarak dockerHub'a göndermek istiyoruz bunu nasıl yapabiliriz?

Bunun için ilk olarak [DockerHub](https://hub.docker.com/) üzerinde bir hesabınızın olması gerekiyor. Bu hesap üzerinde kendinize ait public/private olarak saklayabileceğiniz image'lerinizi tutabilir ve bunlara erişebilir ve kendin Docker Host'unuz üzerine çekebilirsiniz.

Eğer dockerHub üzerinde bir account'unuz varsa o zaman terminal üzerinden docker ile sisteme giriş yapmanız gerekiyor.

```
docker login
```

ile giriş yaptıktan sonra artık kendi ürettiğimiz image'leri dockerHub'a gönderebiliriz demektir. Bu işlemi yapmak için yapacağımız tek komut `image push`. Tam kullanımı ise;

```
docker image push imageName:tagName
```

Bir image'e ait tüm tag'leri dockerHub üzerine göndermek istiyorsanız.

```
docker image push --all-tags imageName
```

argümanını kullanabilirisiniz. Fakat burada dikkat etmemiz gereken çok önemli bir durum söz konusu.

Eğer Docker tarafından onaylanan bir DockerHub Pusher değilseniz (Mongo, Node, Ubuntu vs) Docker'a kendi imageName'inizle bir image upload edemezsiniz. Bu image'in önüne kullanıcı adınızı koyarak bu image'i göndermeniz lazım yani;

kendi oluşturmuş olduğunuz image'in ismi **counter-app** diyelim. Bunu DockerHub üzerine göndermek istiyorsanız;

```
docker image push --all-tags gkandemir/counter-app
```

şeklinde image'i gönderebilirsiniz. Fakat bu durumda `gkandemir/counter-app` şeklinde bir image'iniz Docker Engine üzerinde olmayabilir. Bundan dolayı kullandığınız image'i yeni bir tag ekleyerek push yapılabilecek hale getirebilirsiniz.

```
docker image tag counter-app gkandemir/counter-app
```

dedikten sonra artık DockerHub'a gönderebiliriz.

```
docker image push --all-tags gkandemir/counter-app
```

![Docker Image Push](https://github.com/gkandemi/docker/blob/main/docs/images/docker_image_push.png)

![DockerHub](https://github.com/gkandemi/docker/blob/main/docs/images/docker_hub_images.png)

### Ubuntu'ya Docker Yüklemek | Production | Reverse Proxy

Bu işlem için ilk olarak DigitalOcean üzerinden Ubuntu 20.04(LTS) bir sunucu aldım ve onunla yoluma devam ettim. Sunucuya ssh ile giriş yaptıktan sonra aşağıdaki gibi adımları teker teker uyguladım fakat bunlar için 2 farklı kaynak önerebilirim size;

**Ubuntu'ya Docker Yüklemek**
[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

**Reverse Proxy Açıklaması**
[Reverse Proxy NGINX](https://www.scaleway.com/en/docs/how-to-configure-nginx-reverse-proxy/)

Yine ben buraya kendi adımlarımızı da yazıyorum çünkü biz 2 farklı domain'i tek bir host üzerine yönlendirdik. Yukarıdaki Reverse Proxy açıklaması tam olarak yaptıklarımızı karşılamıyor yine de okumanızda fayda vardır :)

İlk olarak paket listesini güncelleyip ihtiyacımız olan bazı paketleri yüklüyoruz.

```
sudo apt-get update
apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

Docker ve Docker Compose kurulumlarını yapıp versiyonlarını kontrol ediyoruz

```
apt install docker.io
docker --version

apt install docker-compose
docker-compose --version
```

Docker servisinin çalışıp çalışmadığına dikkat edelim. Eğer burada **active(Running)** gibi bir ifade yoksa servisi çalıştırmalıyız.

```
systemctl status docker
```

Çalıştırmak için;

```
systemctl start docker
```

Şimdi Docker yüklendi 2 farklı uygulamayı iki farklı domain tarafından görüntülenebilecek şekilde ayarlayacağız hostumuzu fakat öncesinde bu iki uygulamayı Docker üzerinen sunmamız gerekiyor. Yani Container'ları ayağa kaldırmamız lazım. Container için gerekli olanlar nedir? **Image**. O halde image'leri oluşturmaya başlayalım.

Bunun için **/temp** altında **web-apps** isimli bir klasör oluşturduk ve onun içerisinde **wordpress** ve **asana-clone** isimli 2 farklı klasör oluşturduk.

```
mkdir web-app/wordpress
mkdir web-app/asana-clone
```

WordPress kurulumu için wordpress klasörü içerisinde **docker-compose.yml** dosyasını oluşturup içerisine aşağıdaki kodları yazabilirsiniz.

```
version: "3.4"
services:
  wordpress:
    image: wordpress
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: bloguser
      WORDPRESS_DB_PASSWORD: test123
      WORDPRESS_DB_NAME: blogdb
    volumes:
      - wordpress:/var/www/html
  db:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_DATABASE: blogdb
      MYSQL_USER: bloguser
      MYSQL_PASSWORD: test123
      MYSQL_RANDOM_ROOT_PASSWORD: "1"
    volumes:
      - db:/var/lib/mysql
volumes:
  wordpress:
  db:
```

daha sonrasında yapacağımız tek işlem;

```
docker-compose up
```

**ÖNEMLİ NOT:** bunu yaparken `/tmp/web-apps/wordpress` dizininde olduğunuzdan emin olun.

Asana Clone App kurulumu için ise Local üzerinden dosyayı aktardık. Onun içerisinde zaten bir `app/` ve bir de `Dockerfile` olduğu için onu direk sunucuya `scp` yardımı ile gönderdik.

Örnek Dockerfile içeriği;

```
FROM node:14-slim
WORKDIR /vue-app
COPY app/ .
RUN npm install
RUN npm install -g live-server
RUN npm run build
EXPOSE 8080
CMD ["live-server", "dist"]
```

Bu Dockerfile üzerinden image üretmek için de;

```
docker build . -t asana-clone-app
```

dememiz yeterlidir. Bu image'i çalıştırmak için ise;

```
docker run -p 8090:8080 -d asana-clone-app
```

dememiz yeterli olacaktır.

**ÖNEMLİ NOT:** bunun içinde `/temp/web-apps/asana-clone/` dizininde olduğunuzdan emin olun.

Artık Sunucu üzerinde **8090** portundan **Asana** uygulamasını, **8080** portu üzerinden ise **wordpress** uygulamasını ayağa kaldırdık.

Elimizde 2 farklı domain var;

- videomeet.app
- talkinghead.app

bu iki domaini ilk başta DigitalOcean üzerinden almış olduğumuz Sunucunun **IP Adresine** CloudFlare üzerinden yönlendirdik. Yani kullanıcı bu iki domainden hangisine girerse girsin aynı makineye yönlendirilecek.

Şimdi yapmamız gereken ise buradaki domainin ismine göre (talkinghead ya da videomeet) ilgili container'a yönlendirmek olacak. İşte bu duruma **reverse proxy** deniliyor. Bunu yapmak için sunucuda yoksa **nginx** yüklemeliyiz. Ardından da `sites-available` dizinine girip orada `reverse-proxy.conf` dosyası üreteceğiz. Yazacağımız Reverse Proxy bilgisini bu konfigürasyon dosyasında saklayacağız.

```
apt install nginx
unlink /etc/nginx/sites-enabled/default
cd /etc/nginx/sites-available
vi reverse-proxy.conf
```

Konfigürasyon ise;

```
server {
        listen 80;
        listen [::]:80;
        server_name videomeet.app;
        server_name_in_redirect off;

        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;

        location / {
            proxy_set_header Client-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_pass http://127.0.0.1:8080;
  }
}

server {
        listen 80;
        listen [::]:80;
        server_name talkinghead.app;
        server_name_in_redirect off;

        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;

        location / {
            proxy_set_header Client-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_pass http://127.0.0.1:8090;
  }
}
```

daha sonrasında şu adımları yapmalıyız;

```
ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf
nginx -t
systemctl restart nginx
systemctl status nginx
```

burayı özet geçecek olursak `sites-available` içerisindeki reverse-proxy.conf dosyasını `sites-enabled` içerisine aktarıyoruz ve nginx'i test ediyoruz. Burada eğer **success** görüyorsanız her şey yolunda demektir :)

Bundan sonraki tek adım ise **nginx** servisini yeniden başlatmak demektir :)

Böylece 2 farklı domain tek sunucu üzerinen docker host'un farklı uçlarına bakıyor hale geldiler.
