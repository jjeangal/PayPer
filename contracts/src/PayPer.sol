// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract PayPer {
    enum NewsType {
        POLITICS,
        ECONOMICS,
        SPORTS,
        TECH,
        BUSINESS,
        ENTERTAINMENT
    }

    struct Article {
        uint256 id;
        address journalist;
        string name;
        string freeContent;
        string encryptedUrl;
        string imageUrl;
        string videoUrl;
        uint256 totalRating;
        uint256 amountOfRatings;
        uint256 price;
        uint256 totalPaymentReceived;
        uint256 date;
        NewsType newsType;
    }

    struct Journalist {
        address id;
        string name;
        string description;
        uint256 totalRating;
        uint256 amountOfRatings;
    }

    struct Edition {
        uint256 id;
        uint256 date;
        uint256[] articlesOfEdition;
    }

    event PostedArticle(uint256 id, string name,
        address journalist,
        string freeContent,
        string  url,
        string  imageUrl,
        string  videoUrl,
        uint256 price,
        uint256 date,
        uint256 newsType);

    event CreatedJournalist(string name, string description, address journalistAddress);

    event CreatedEdition(uint256 id, uint256 date, uint256[] articlesOfEdition);

    event ArticlePurchased(uint256 articleId, address purchaser, uint256 paidAmount);

    event ArticleRated(uint256 articleId, uint256 rating, uint256 totalRating, uint256 amountOfRatings);

    event JounralistTipped(address journalist, uint256 tipAmount, string message);

    event JournalistRated(address journalist, uint256 rating, uint256 totalRating, uint256 amountOfRatings);
    event ArticleDeleted(uint256 articleId);

    mapping(uint256 => Article) public articles;
    mapping(address => Journalist) public journalists;
    mapping(uint256 => Edition) public editions;
    mapping(address => mapping(uint256 => bool)) public purchases; //boolean record of if an address has purchased article with uint256 id

    uint256 public currentArticleId = 0;
    uint256 public currentEditionId = 0;

    constructor(address owner) {}

    function postArticle(
        string memory name,
        string memory freeContent,
        string memory url,
        string memory imageUrl,
        string memory videoUrl,
        uint256 price,
        uint256 newsType
    ) external {
        currentArticleId += 1;
        Article memory article = Article({
            id: currentArticleId,
            journalist: msg.sender,
            name: name,
            freeContent: freeContent,
            encryptedUrl: url,
            amountOfRatings: 0,
            totalRating: 0,
            price: price,
            totalPaymentReceived: 0,
            date: block.timestamp,
            newsType: NewsType(newsType),
            imageUrl: imageUrl,
            videoUrl: videoUrl
        });

        articles[currentArticleId] = article;

        emit PostedArticle(article.id, article.name, article.journalist, article.freeContent, article.encryptedUrl, article.imageUrl, article.videoUrl, article.price, article.date, uint256(article.newsType));
    }

    function deleteArticle(uint256 articleId) external {
        delete articles[articleId];

        emit ArticleDeleted(articleId);
    }

    function createJournalist(string memory name, string memory description, address journalistAddress)
        external
    {
        Journalist memory journalist =
            Journalist({id: journalistAddress, name: name, description: description, totalRating: 0, amountOfRatings: 0});

        journalists[journalistAddress] = journalist;

        emit CreatedJournalist(journalist.name, journalist.description, journalist.id);
    }

    /**
    Here an edition is what I thought of as a new version of the newspaper
    each edition can contain a list of articles that are going to be displayed
    i think we can make a dao that decides on these articles.
     */
    function createEdition(uint256[] memory articlesOfEdition) external {
        currentEditionId += 1;

        Edition memory edition =
            Edition({id: currentEditionId, date: block.timestamp, articlesOfEdition: articlesOfEdition});

        editions[currentEditionId] = edition;
        
        emit CreatedEdition(edition.id, edition.date, edition.articlesOfEdition);
    }

    function buyArticle(uint256 articleId) external payable {
        require(articleId <= currentArticleId, "article does not exist");
        Article memory article = articles[articleId];
        uint256 price = article.price;
        require(msg.value >= price, "did not send enough");

        address payable journalist = payable(article.journalist);
        purchases[msg.sender][articleId] = true;
        uint256 paymentsReceived = article.totalPaymentReceived;
        paymentsReceived = paymentsReceived + msg.value;
        article.totalPaymentReceived = paymentsReceived;
        articles[articleId] = article;
        journalist.transfer(msg.value);

        emit ArticlePurchased(articleId, msg.sender, msg.value);
    }

    /**
    for the ratings I have used 2 params
    totalRating and amountOfRatings
    totalRating is the aggregate total of all rating received. if 10 people have rated 5, the total rating is goign to be 50
    amountOfRating is how many people have rated? if 10 people have rated an article 5, amountOfRating is going to be 10.
    I didn't want to directly divide, I was afraid of division errors
    if you think its unnecessary to do this, you can remove it
     */
    function rateArticle(uint256 articleId, uint256 rating) external {
        require(articleId <= currentArticleId, "article does not exist");
        require(rating <= 5, "cannot rate higher than 5");
        Article memory article = articles[articleId];

        uint256 totalRatingOfArticle = article.totalRating;
        uint256 amountOfRatings = article.amountOfRatings;

        totalRatingOfArticle += rating;
        amountOfRatings += 1;

        article.totalRating = totalRatingOfArticle;
        article.amountOfRatings = amountOfRatings;

        articles[articleId] = article;

        emit ArticleRated(articleId, rating, article.totalRating, article.amountOfRatings);
    }

    function tipJournalist(address journalist, string memory message) external payable {
        // here, i'd like to add a message via push protocol maybe.
        payable(journalist).transfer(msg.value);

        emit JounralistTipped(journalist, msg.value, message);
    }

     function rateJournalist(address journalistAddress, uint256 rating) external {
        require(rating <= 5, "cannot rate higher than 5");
        Journalist memory journalist = journalists[journalistAddress];

        uint256 totalRating = journalist.totalRating;
        uint256 amountOfRatings = journalist.amountOfRatings;

        totalRating += rating;
        amountOfRatings += 1;

        journalist.totalRating = totalRating;
        journalist.amountOfRatings = amountOfRatings;

        journalists[journalistAddress] = journalist;

        emit JournalistRated(journalist.id, rating, journalist.totalRating, journalist.amountOfRatings);
    }
}
