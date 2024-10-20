export class CreateReviewDTO {
  constructor({ rating, comment, userId }) {
    this.rating = rating;
    this.comment = comment;
    this.userId = userId;
  }

  static validate(reviewData) {
    const { rating, comment, userId } = reviewData;

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      throw new Error("Invalid 'rating' field: must be a number between 1 and 5");
    }

    if (!comment || typeof comment !== 'string') {
      throw new Error("Invalid or missing 'comment' field");
    }

    if (!userId || typeof userId !== 'string') {
      throw new Error("Invalid or missing 'userId' field");
    }

    return new CreateReviewDTO(reviewData);
  }
}
