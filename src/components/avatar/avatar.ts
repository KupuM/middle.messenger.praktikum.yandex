import { Block } from 'core/block';
import { BASE_RESOURCES_URL_PATH } from 'core/constants';
import { type IFormElementProps, type IBlockProps } from 'core/models';
import './avatar.scss';
import noAvatar from './images/no_avatar.svg';

export class Avatar extends Block<IBlockProps> {
    static componentName = 'Avatar';

    constructor({ onClick, ...props }: IFormElementProps) {
        super({
            ...props,
            events: {
                click: onClick,
            },
        });
    }

    render() {
        const avatarPath = this.props.avatarPath as string;
        const avatarImage = avatarPath && avatarPath !== 'null' ? BASE_RESOURCES_URL_PATH + avatarPath : noAvatar;

        return `<div class="profile__image {{className}}" onClick="{{onClick}}" style="background-image: url('${avatarImage}')"></div>`
    }
}
