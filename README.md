# LearningHub Round 2 STEM HACK



<!-- PROJECT LOGO -->
<br />

<p align="center">

  <strong>
    <h3 align="center" >Study Aid</h3>
  </strong>
  <p align="center">
    <strong>
      Trang Web tích hợp AI nhằm đánh giá và nâng cao chất lượng học của học sinh
    </strong>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installation">Setting up Database</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## Tổng quan về Study Aid

- Tối ưu hoá việc học bằng các AI model.
- Một Website giúp kết nối các bạn học sinh có cùng sở thích môn học


---

<br/>

### Built With

- [React](https://reactjs.org/docs/getting-started.html)
- [Tensor Flow](https://www.tensorflow.org/)
- [Zego Cloud](https://github.com/hoangviet2/LearningHub.git)
- [Face-apis](https://justadudewhohacks.github.io/face-api.js/docs/index.html)

Written in React Javascript ♥

## Getting Started

Follow the instructions to set up the project on your local machine.

### Prerequisites

Install [NodeJS LTS](https://nodejs.org/en/)

- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/hoangviet2/LearningHub.git
   ```

2. Get to the repo

   ```sh
   cd LearningHub
   ```

2. Install NPM packages

   ```sh
   npm install i
   ```

3. Start the react and nodejs server concucrrently

   ```sh
   npm run dev
   ```

## Roadmap
### Inspiration & Solutions
- Ứng dụng rộng rãi của trí tuệ nhân tạo trong học tập thời điểm hiện tại.
- Mong muốn tạo ra một nền tảng giáo dục hiện đại, hiệu quả và toàn diện dựa trên trí tuệ nhân tạo, đáp ứng nhu cầu đa dạng của học sinh. Trang lấy cảm hứng từ một số khó khăn hiện hành và cấp bách mà học sinh ngày nay phải đối mặt:
Sử dụng mạng xã hội không có mục đích mục đích.
+ Theo một khảo sát gần đây, giới trẻ Việt Nam dành trung bình 7 giờ mỗi ngày sử dụng mạng xã hội. (Nguồn: abei.gov.vn)
+ Đặc điểm nổi bật của các trang mạng xã hội hiện nay là tốc độ và tính phong phú của thông tin nhưng lại bị trộn lẫn giữa thông tin tốt và xấu, thiếu định hướng (...) Trước các tính năng hấp dẫn và lôi cuốn, người dùng dễ rơi vào “biển thông tin” hỗn loạn một cách vô thức, dẫn đến xao nhãng học tập, giảm năng suất lao động, căng thẳng tinh thần và chìm đắm vào thế giới ảo. (Nguồn: hatinh.dcs.vn)
⇒ Giải pháp & Chức năng: Newsfeed: theo kịp xu hướng của thế hệ Gen Z và tạo ra nội dung chất lượng cao, bằng cách xây dựng một trang mạng xã hội tập trung vào nội dung học tập bổ ích, “bắt trend”, những giờ tự học sẽ không bị bó buộc, các bạn có thể vừa giải trí, vừa biết thêm kiến thức mới.
2. Học tập, làm việc nhóm kém hiệu quả.
+ Chưa có một nền tảng phòng họp theo nhóm hiệu quả để học sinh, sinh viên lập nhóm trao đổi, làm việc, chia sẻ, sắp xếp, theo dõi tiến độ công việc,... (gọn gàng, bảo mật, linh hoạt, dễ sử dụng).
+ Thiếu tập trung. 
+ Gặp khó khăn trong việc quản lý thời gian, ưu tiên và đặt ra mục tiêu khả thi. 
⇒ Giải pháp & Chức năng: Study room (không gian phòng học ảo theo nhóm nhỏ): cho phép người học tạo không gian học theo nhóm nhỏ cùng bạn bè hoặc người lạ. Nhóm sẽ kết hợp tính năng theo dõi cảm xúc của người học trong quá trình và sử dụng trí tuệ nhân tạo (AI) đưa ra lời khuyên. Trên hết, chúng mình muốn thúc đẩy tính tò mò, khuyến khích niềm vui thích đúng nghĩa đối với việc học thay vì chỉ chú ý đến số giờ ngồi vào bàn không hiệu quả.
3. Đáp án có sẵn trên mạng không giúp học sinh hiểu bài. Trên mạng có nhiều trang cung cấp đáp án bài tập nhưng thường không đưa ra giải thích cụ thể hoặc nếu có thì phần lớn không đầy đủ, rối rắm. Học sinh nhận được câu trả lời nhưng không hoàn toàn hiểu và làm bài tập kém hiệu quả.
⇒ Giải pháp: Hỏi đáp bài tập cùng chat bot: cung cấp đáp án cho bài tập, giải thích cụ thể và hỗ trợ trò chuyện cùng chat bot giúp các bạn học sinh không chỉ hiểu rõ kiến thức mà còn biết cách tối ưu hóa công nghệ AI vào việc học.
### Features (Hiện tại đang có)
1. Sử dụng AI nhằm kiểm tra cảm xúc của các bạn học sinh
2. Tạo ra phòng học (meeting) cho các bạn học sinh học với nhau
### Features (Đang phát triển)
1. Tạo ra một chuyên mục gồm các chia sẻ về các kiến thức học tập
2. Chatbot cho các phòng học nhằm có thể hỏi đáp
3. Tạo ra danh mục các phòng học phù hợp với cá nhân.

### Things To do

- [x] Inital Landing Page
- [x] Enable Video Feed
- [x] Real Time Emotion Analysis using TensorFlow
- [x] Adding Models from face-api
- [x] Add Static Analysis of a picture
- [x] Add CI/CD using github actions
- [x] Deploy on Netlify

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

Refer to this [article](https://medium.com/swlh/guide-to-git-a-practical-approach-27926a1ff564?sk=b54ca413a142c275f5d2901d0384a0db) if you have any difficulty in making a pull request

## Contact

Hoàng Việt - hoangviet18306@gmail.com

---

## Acknowledgements

- [react](https://reactjs.org/)
- [ZegoCloud](https://www.zegocloud.com/)
- [face-apis](https://justadudewhohacks.github.io/face-api.js/docs/index.html)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
- Hoàng Việt (Hacker)
- Đào Thanh Mai (Hacker)
- Võ Ngọc Quỳnh Vy (Hipster)
- Phạm Võ Bảo Ngân (Hipster)
