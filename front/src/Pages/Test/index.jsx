import { useContext } from 'react';
import {useStates } from '../../Hooks/useStates';

import styles from './styles/index.module.scss';

const Test = props => {
    const { ls, lf, s, f } = useStates();
    return (
        <div className={`${styles.test}`}>

            <div className={`${styles.div1}`}>
                mucho pero mucho texto, con un lorem300
                <br />
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quia perspiciatis soluta aperiam nisi harum vero similique eveniet fugiat, dicta sint omnis expedita cum animi dolor eaque impedit illum eos praesentium aliquam molestiae repellendus? Consectetur laudantium dolor culpa. Nostrum recusandae consequuntur laboriosam, sunt a cupiditate repudiandae laudantium asperiores dolorem numquam, aperiam ratione, dicta natus illum consequatur maiores quibusdam earum expedita error minima impedit. Dicta veritatis alias minus, neque placeat totam fugit repellendus labore accusamus deleniti hic ad, quidem possimus consequuntur aspernatur sit quaerat ullam repudiandae magni autem officia atque architecto, sunt earum? Unde autem libero sint, veniam culpa ad ex perspiciatis, similique obcaecati eius odit accusantium vitae iure voluptatem sunt eaque earum ullam ea id. Totam perferendis maiores vitae id. Eius laboriosam sapiente beatae aliquam illo provident voluptatum minus ducimus enim dolor, odio ex necessitatibus facilis ad, reprehenderit eum, quos ratione rerum eligendi! Officia libero repellendus explicabo omnis veritatis quasi ab? Aliquid ea perferendis, a unde consectetur, dicta voluptatum doloribus ut, minus nobis eos animi dolore quos quis deserunt maxime? Alias pariatur suscipit hic perspiciatis adipisci non minima cupiditate iusto asperiores eligendi doloremque ab, vero quas, similique corporis ipsa rerum ipsum tempore. Quisquam ullam nobis iste? At quibusdam ratione quidem ea sed totam dolor aperiam nesciunt quia nisi. Sit reiciendis, quisquam laborum quidem debitis perferendis, quam laudantium odio excepturi hic consequatur beatae illo. Neque incidunt, fugiat et praesentium deleniti quia quis rerum temporibus labore dolores? Eligendi, suscipit aliquam optio in praesentium cum iure doloremque rerum ipsa vero facere dolores voluptatem animi tenetur alias earum, culpa eos molestias tempore labore itaque ad magni cumque recusandae! A rem facere voluptatibus porro at totam molestias, suscipit voluptate vero perspiciatis dolorum dolore asperiores aut, unde, voluptas quos eius! Labore eius recusandae quaerat reiciendis expedita, inventore autem itaque accusamus sapiente assumenda distinctio quo, culpa consequatur.
            </div>
            <div className={`${styles.separador}`}>
            </div>
            {/* <div className={`${styles.div2}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae recusandae officiis eos asperiores fugit, soluta ad molestiae quaerat, animi perferendis voluptas nam, cumque delectus? Esse laudantium eaque perspiciatis dolorum dolorem.
            </div> */}

        </div>
    )
}

export { Test };
