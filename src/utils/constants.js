export const BLOCK_NAMESPACE = 'smfcs';

export const BLOCKS = {
    FLASHCARD_SET: `${BLOCK_NAMESPACE}/flashcard-set`,
    FLASHCARD: `${BLOCK_NAMESPACE}/flashcard`,
    FLASHCARD_FRONT: `${BLOCK_NAMESPACE}/flashcard-front`,
    FLASHCARD_BACK: `${BLOCK_NAMESPACE}/flashcard-back`
};

export const FLASHCARD_SET_ALLOWED_BLOCKS = [BLOCKS.FLASHCARD];
export const FLASHCARD_SET_DEFAULT_TEMPLATE = [[BLOCKS.FLASHCARD]]; 

export const FLASHCARD_ALLOWED_BLOCKS = [BLOCKS.FLASHCARD_FRONT, BLOCKS.FLASHCARD_BACK];
export const FLASHCARD_TEMPLATE = [
	[BLOCKS.FLASHCARD_FRONT],
	[BLOCKS.FLASHCARD_BACK]
];

export const CARD_STACK_BLOCKS = {
    CARD_STACK: `${BLOCK_NAMESPACE}/stack`,
    CARD: `${BLOCK_NAMESPACE}/card`
};

export const CARD_STACK_ALLOWED_BLOCKS = [CARD_STACK_BLOCKS.CARD];
export const CARD_STACK_DEFAULT_TEMPLATE = [[CARD_STACK_BLOCKS.CARD]];

export const ANIMATION_TYPES = {
    FLIP: 'flip',
    SLIDE: 'slide',
    STACK: 'stack'
};

export const ANIMATION_DIRECTIONS = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
};

export const CARD_STACK_DEFAULT_SETTINGS = {
    animationType: ANIMATION_TYPES.FLIP,
    animationDirection: ANIMATION_DIRECTIONS.HORIZONTAL,
    stackSpacing: 10,
    backgroundColor: '#ffffff',
    textColor: '#000000',
    borderRadius: 8,
    padding: 20
};
