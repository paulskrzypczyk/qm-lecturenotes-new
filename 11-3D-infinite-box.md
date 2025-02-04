---
title: "Chapter 11: The 3D infinite box" 
short_title: "Ch. 11: 3D infinite box"
numbering:
  enumerator: 11.%s
authors:
  - name: 
    affiliations:
---

In this chapter we will apply what we learnt in the [previous chapter](10-QM-in-3D) to the mathematically simplest situation involving a particle confined in a three-dimensional potential well. The potential well we will consider is the direct generalisation of the **infinite square well** that we studied in [](07-infinite-square-well). We will refer to this as the **3D infinite box** potential. 

As we explained in [](07-infinite-square-well), the idea that a particle could have an infinite potential energy in some region isn't particularly physical. Nevertheless, it provides us with a **clean mathematical** model which is easy to study, and it can be viewed as a fairly good approximation to a **very deep potential well**. 

The main new ingredient we will encounter in this chapter is that in 3D **energy levels become degenerate**. This means that we will see that there are multiple different **distinct** energy eigenstates of the 3D infinite box, all with **the same energy**. While we have encountered energy degeneracy before in 1D, this only happened when the particle was **non-bound**. It is a new feature of 3D that we can have energy level degeneracy, and this is indeed a very important feature of nature (for example, the energy levels of Hydrogren are degenerate). 

We will also see that even though we are now considering a 3D problem, **what we learnt in 1D is still highly relevant**. We will in particular see how the **1D energy eigenfunctions** in fact compose to give us the **3D eigenfunctions**. This is generically the case, and highlights the importance of studying 1D problems as a means for understanding the physics of more realisitic 3D problems. 

## The 3D infinite box potential

We are going to consider a situation where a particle is **perfectly confined** inside a 3D 'box' — of volumne $L^3$. That is, just like in 1D, that there are 'walls' at $x = 0$ and $x = L$, as well as at $y = 0$ and $y = L$ and $z = 0$ and $z = L$, leaving a perfectly **cubic** region in which the particle is confined. We can model this with the following potential energy function, the direct analogue of [](#e-infinite-square-well),

```{math}
:label: e-infinite-3D-box
V(\rvec) = \begin{cases} 0 &\text{if }{0 \leq x,y,z \leq L} , \\
                    \infty &\text{otherwise,}
        \end{cases}
```
where $0 \leq x,y,z \leq L$ means that **all three coordinates must individually be between 0 and $L$**. Unlike in 1D, it is no longer easy to depict this potential in a figure! Hopefully though it is straightforward to understand the basic geometry of this potential well. 

Note that here we have chosen to take **all 3 side lengths to be equal**. This is a rather natural situation to consider, and will be the most interesting from the perspective of **degeneracy**. In [](#ex-3-side-lengths) you will consider the most general situation, where all three side lengths differ. 

## Energy eigenstates of the 3D infinite box potential

As always, our first goal in studying the 3D infinite box potential is to determine the **energy eigenstates** and associated **energy eigenvalues**. Since we have a particle confined inside a well, these will be **bound states** and so we expect that we will find **discrete energy levels**, just as we found in 1D. 

As we spent some time arguing in 1D, due to the fact that the potential energy is **infinite** outside of the box, and given that physically we only want to consider that the particle has **finite energy**, it is natural to assume that the energy eigenfunctions will **vanish** outside of the box. That is, if we refer to the inside of the box as **region I**, and outside the box as **region II**, then we will look for energy eigenfunctions of the form
```{math}
u_E(\rvec) = \begin{cases} u_E^{\rI}(\rvec) &\text{if }{0 \leq x,y,z \leq L} , \\
                    0 &\text{otherwise,}
        \end{cases}
```
where $u_E^\rI(\rvec)$ is the function we would like to find. Since studying the infinite square well in Chapter 7, we subsequently saw in [](08-harmonic-oscillator) that particles can **tunnel** into regions where they don't have enough energy to be classically. We might therefore now be concerned about our assumption that the wavefunction vanishes outside the box. Although we don't go further into this here, it can be shown that **due to the infinite nature of the potential** the wavefunction really does vanish outside of the box, and we are again in the exception circumstance where there is **no tunnelling or barrier penetration**. 

We can therefore restrict our attention to the **inside** of the well. In this region, the Hamiltonian of the particle takes the simple form
```{math}
\hat{H} = \frac{\hat{P}^2_x + \hat{P}^2_y + \hat{P}^2_z}{2M},
```
since inside the well the potential vanishes. The 3D TISE [](#e-3D-TISE) therefore reads
```{math}
:label: e-TISE-3D-box
\vph-\frac{\hbar^2}{2M}\left(\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2}\right)u_E^\rI(\rvec) = Eu_E^\rI(\rvec),
```
where the left-hand side is $\op{H}u_E^\rI(\rvec)$. 

Up until now we have only solved the TISE for a particle in 1D, which was then a partial differential equation in one variable. Now, for the first time, we need to study a partial differential equation in three variables, and understand how we can find its solutions. 

Instead of approaching this head-on, we will try to analyse the structure a little, and in so doing, realise that we can **spot** the solutions. 

In order to do so, let us first recall our solution to the 1D infinite square well. This was given in [](#e-energy-eigenfunctions-ISW), namely,
![](#e-energy-eigenfunctions-ISW)
The fact that these are energy eigenfunctions mean that **inside** the infinite square well ($0 \leq x \leq L$) they satisfy the relevant TISE, namely
```{math}
:label: e-TISE-3D-box-u
-\frac{\hbar^2}{2M} \frac{\partial^2}{\partial x^2} \left(\sqrt{\frac{2}{L}} \sin \frac{n\pi x}{L}\right) =  \frac{\hbar^2 n^2 \pi^2}{2ML^2} \sqrt{\frac{2}{L}} \sin \frac{n\pi x}{L}
```
from which we confirm that the corresponding energy eigenvalue is $E_n = \frac{\hbar^2 n^2 \pi^2}{2ML^2}$. 

*Why is this relevant?* Well, if we consider just the **first** term on the left-hand side of [](#e-TISE-3D-box-u) — i.e. $\hat{P}^2_{x,\mathrm{w}}/2M$ — it is **identical** to the 1D TISE, except for the fact that in 1D the eigenfunctions were **only** a function of $x$, while now we have a 3D function, of $\rvec$. However, this isn't a big problem, since if we consider **any** function of the form 
```{math}
u(\rvec) = u_n(x) f(y,z),
```
where $f(y,z)$ is some arbitrary function of $y$ and $z$ alone, then we see that we have essentially **identical behaviour**, and that, in fact, **any such function will be an eigenfunction of $\hat{P}^2_{x,\mathrm{w}}/2M$. Namely,
```{math}
-\frac{\hbar^2}{2M} \frac{\partial^2}{\partial x^2} u(\rvec) &= 
-\frac{\hbar^2}{2M} \frac{\partial^2}{\partial x^2} \left(\sqrt{\frac{2}{L}} \sin \frac{n\pi x}{L}f(y,z)\right) \\ 
&=  \frac{\hbar^2 n^2 \pi^2}{2ML^2} \sqrt{\frac{2}{L}} \sin \frac{n\pi x}{L}f(y,z),\\
&= E_n u(\rvec) f(y,z),
```
where we have used the fact that the **partial derivative** treats $f(y,z)$ essentially as a **constant**. The above confirms that $u(\rvec) = u_n(x) f(y,z)$ is an eigenfunction, with the eigenvalue $E_n$ as $u_n(x)$. 

*Why has this helped us?* Well, the next key step is to realise that we could make the **same argument**, but now focusing only on the $y$ component of the kinetic energy, $P^2_y/2M$, or the $z$ component of the kinetic energy, $P^2_z/2M$. In these two cases respectively, we would see that any functions of the form 
```{math}
u'(\rvec) &= u_n(y)f'(x,z)& \text{and }&& u''(\rvec) &= f''(x,y)u_n(z),
```
would be eigenfunctions of $\hat{P}^2_{y,\mathrm{w}}/2M$ and $\hat{P}^2_{z,\mathrm{w}}/2M$ respectively, all with the same eigenvalue $E_n$, for arbitrary functions $f'(x,z)$ and $f''(y,z)$. 

Now, we **aren't looking for eigenfunctions of an individual component of the kinetic energy**. However, what we have seen above shows us that there is a way to find a **joint eigenfunction** of all 3 components! In particular, we see that if we find a function such that the behaviour in $x$ is $u_n(x)$, the behaviour in $y$ is $u_n(y)$ and the behaviour in $z$ is $u_n(z)$, then **this will do the job**! It is easy to write down such a function — it is **just the product of the three individual functions**! We only need to be **careful** and realise that we **shouldn't repeat $n$ 3 times, but consider 3 different values of $n$**, which we will call $n_x$, $n_y$ and $n_z$ respectively. Thus, we arrive at the **educated guess** (also called **ansatz** frequently), that the energy eigenfunctions of the infinite box are of the form

````{card}
```{math}
\vph u_\mathbf{n}(\rvec) &= u_{n_x}(x)u_{n_y}(y)u_{n_z}(z),\\
&= \begin{cases} \sqrt{\frac{8}{L^3}} \sin \frac{n_x \pi x}{L}\sin \frac{n_y \pi y}{L}\sin \frac{n_z \pi z}{L} &\text{ if } 0 \leq x,y,z \leq L, \\
0 &\text{ otherwise,} \end{cases}
```
````
where, just as we did in 1D, we have **changed notation** from $u_E(\rvec)$ to $u_\mathbf{n}(\rvec)$, labelling the energy eigenfunction by the **vector of quantum numbers**
````{card}
```{math}
\mathbf{n} = (n_x, n_y, n_z).
```
````
As an [exercise](#ex-check-eigenfunctions) you will confirm explicitly that these functions **satisfy the TISE** [](#e-TISE-3D-box) with energy eigenvalue 
````{card}
```{math}
E_\mathbf{n} = \frac{\hbar^2 \pi^2}{2ML^2} \left(n_x^2 + n_y^2 + n_z^2\right).
```
````





